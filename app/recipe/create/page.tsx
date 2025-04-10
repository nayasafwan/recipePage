"use client";
import ImageIcon from "../../../public/assets/ImageIcon.png";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Ingredient, Instruction } from "@/app/interfaces/interface";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipeValue,
  setIngredientState,
  addIngredientState,
  removeIngredientState,
  addInstructionState,
  removeInstructionState,
  rearrangeInstruction,
  setInstructionState,
  setMeasuingUnit
} from "../../redux/recipeFormSlider";
import { ToastContainer, toast } from "react-toastify";
import units from "../../data/measuringUnit.json";
import ProtectedRoute from "@/app/components/parent/protectedRoute";
import api from "@/app/utils/api";

export default function CreateRecipe() {
  
  

  const createdRecipe = useSelector((state: any) => state.recipeForm.recipe);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const dispatch = useDispatch();

  const validateRecipe = () => {
    if (createdRecipe.name === "") {
      toast.error("Please enter recipe name");
      return false;
    } else if (createdRecipe.description === "") {
      toast.error("Please enter recipe description");
      return false;
    } else if (createdRecipe.category === "") {
      toast.error("Please select recipe category");
      return false;
    } else if (createdRecipe.cookingTime === "") {
      toast.error("Please enter cooking time");
      return false;
    } else if (
      createdRecipe.ingredients.length === 0 ||
      (createdRecipe.ingredients.length === 1 &&
        createdRecipe.ingredients[0].name === "")
    ) {
      toast.error("Please enter at least one ingredient");
      return false;
    }

    createdRecipe.ingredients.forEach((element: Ingredient, index: number) => {
      if (
        element.name === "" &&
        index !== createdRecipe.ingredients.length - 1
      ) {
        //if ingredient name is empty and ingredient is not the last one
        toast.error("Please enter ingredient name");
        return false;
      }
    });

    createdRecipe.instructions.forEach(
      (element: Instruction, index: number) => {
        if (
          element.name === "" &&
          index !== createdRecipe.instructions.length - 1
        ) {
          //if instruction name is empty and instruction is not the last one
          toast.error("Please enter instruction name");
          return false;
        }
      }
    );

    return true;
  };


  console.log("createdRecipe", createdRecipe);

  const createRecipe = async () => {

    if (!validateRecipe()) return;

    
    try {

      const imagePath = await saveFile();

      let formatInstructions = createdRecipe.instructions.map((instruction: Instruction) => instruction.name)

      const response = await api.post("/graphql", {
        query: `mutation PostRecipe(
            $name: String!
            $description: String!
            $category: String!
            $cookingTime: String!
            $image: String!
            $ingredients: [IngredientInput!]!
            $instructions: [String!]!
          )
         {
          postRecipe(
            name: $name
            description: $description
            category: $category
            cookingTime: $cookingTime
            image: $image
            ingredients: $ingredients
            instructions: $instructions
          ){ ... on Recipe{
              id
            }
            ... on ErrorMessage {
              message,
              code
            } 
          }
        }`,
        variables: {
          name: createdRecipe.name,
          description: createdRecipe.description,
          category: createdRecipe.category,
          cookingTime: createdRecipe.cookingTime,
          image: imagePath,
          ingredients: createdRecipe.ingredients,
          instructions: formatInstructions
        }
      })

    }
    catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(setRecipeValue({ name, value }));
  };

  const handleImageChange = (event: any) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setFile(file);

      dispatch(setRecipeValue({ name: "image", value: url }))
      
    }
  };

  const openFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const saveFile = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      return data.imageName; // Return the image name or URL as needed
      
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = createdRecipe.instructions.findIndex((item : Instruction) => item.id === active.id);
    const newIndex = createdRecipe.instructions.findIndex((item : Instruction) => item.id === over.id);

    dispatch(rearrangeInstruction({ oldIndex, newIndex }));
  };



  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-semibold">Create Recipe</h1>
      <div className="w-full flex flex-col gap-8 py-4 px-6 rounded-lg border-2 border-gray-300 border-opacity-50 mt-4">
        <div>
          <h2 className="text-lg font-medium mb-2">
            Recipe Title<span className="text-primary">*</span>
          </h2>
          <input
            onChange={(event) => handleInputChange(event)}
            value={createdRecipe.name}
            name="name"
            className="border rounded w-1/2 py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
            type="text"
            placeholder="Recipe Title"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">
            Description<span className="text-primary">*</span>
          </h2>
          <textarea
            onChange={(event) => handleInputChange(event)}
            name="description"
            value={createdRecipe.description}
            rows={4}
            className="p-2.5 w-full text-base text-gray-700 rounded-lg border border-slate-300 focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
            placeholder="Description"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Image</h2>
          {createdRecipe.image ? (
            <img
              className="border-slate-300 object-contain w-full border rounded-lg h-40 relative cursor-pointer"
              onClick={() => openFile()}
              src={createdRecipe.image || ""}
            />
          ) : (
            <div className="border bg-white border-slate-300 flex-col border-dashed w-full h-40 py-8 flex items-center justify-center rounded-lg">
              <Image src={ImageIcon} alt="upload image" className="w-12 h-12" />
              <p className="text-base text-gray-700 mt-1">
                Click here to{" "}
                <span
                  onClick={() => openFile()}
                  className="text-blue-700 cursor-pointer"
                >
                  Upload a file
                </span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
          <input
            name="image"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            onChange={(event) => handleImageChange(event)}
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">
            Category<span className="text-primary">*</span>
          </h2>
          <select
            onChange={(event) => handleInputChange(event)}
            name="category"
            value={createdRecipe.category}
            className="bg-white border border-slate-300 text-gray-900 rounded-lg focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none block w-1/2 p-2.5"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Beverage">Beverage</option>
            <option value="Dessert">Dessert</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
          </select>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">
            Cooking Time<span className="text-primary">*</span>
          </h2>
          <input
            placeholder="60"
            onChange={(event) => handleInputChange(event)}
            name="cookingTime"
            value={createdRecipe.cookingTime}
            type="number"
            accept="number"
            onKeyDown={(event) => {
              if (event.key === "-" || event.key === "e") {
                event.preventDefault();
              }
            }}
            min="0"
            className="border rounded w-14 py-1 px-2 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
          />
          <span className="ml-1.5">minutes</span>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium">
            Ingredients<span className="text-primary">*</span>
          </h2>
          {createdRecipe.ingredients.map(
            (ingredient: Ingredient, index: number) => (
              <IngredientCard
                key={index}
                index={index}
                ingredient={ingredient}
              />
            )
          )}
        </div>
        <button
          onClick={() =>
            dispatch(
              addIngredientState({ name: "", quantity: "", measuringUnit: "" })
            )
          }
          className="border border-primary w-full hover:bg-gray-100 text-primary text-centers py-2.5 text-lg rounded-lg flex justify-center items-center"
        >
          <AddIcon />
          <span className="ml-2">Add Ingredient</span>
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-medium">Instructions</h2>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={createdRecipe.instructions}
              strategy={verticalListSortingStrategy}
            >
              {createdRecipe.instructions.map(
                (instruction: Instruction) => (
                  <InstructionCard key={instruction.id} instruction={instruction} />
                )
              )}
            </SortableContext>
          </DndContext>
        </div>
        <button
          onClick={() =>
            dispatch(
              addInstructionState({
                id: (createdRecipe.instructions.length + 1).toString(),
                name: "",
                order: createdRecipe.instructions.length + 1,
              })
            )
          }
          className="border border-primary w-full hover:bg-gray-100 text-primary text-centers py-2.5 text-lg rounded-lg flex justify-center items-center"
        >
          <AddIcon />
          <span className="ml-2">Add Instruction</span>
        </button>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => createRecipe()}
            className="bg-primary hover:bg-orange-400 text-white w-40 text-centers py-2.5 text-lg rounded-lg"
          >
            Create Recipe
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        theme="colored"
      />
    </ProtectedRoute>
  );
}

const IngredientCard = ({
  ingredient,
  index,
}: {
  ingredient?: Ingredient;
  index: number;
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const [filteredUnits, setFilteredUnits] = useState(Object.keys(units));

  const searchForUnits = (event: any) => {
    const { value } = event.target;

    const unitKeys = Object.keys(units);
    setFilteredUnits(unitKeys.filter((unit) => unit.toLowerCase().includes(value.toLowerCase())));
  }

  const dispatch = useDispatch();

  const handleIngredientChange = (event: any) => {
    let { name, value } = event.target;
    if(name === "quantity") {
      value = Number(value);
    }
    dispatch(setIngredientState({ index, name, value }));
  };


  return (
    <div className="flex mt-2">
      <input
        type="number"
        value={ingredient?.quantity}
        name="quantity"
        onChange={(event) => handleIngredientChange(event)}
        className="w-32 bg-white text-gray-950 border border-r-0 border-slate-300 rounded-l-md pl-3 transition duration-300 ease focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
        placeholder="3"
      />

      <div className="relative">
        <input
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="h-full border-slate-300 border w-32  rounded-r-md bg-white text-slate-700 px-5 py-2.5 inline-flex items-center focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
          type="text"
          onClick={() => setOpenDropdown((prev) => !prev)}
          onBlur={() => setTimeout(() => setOpenDropdown(false), 400)}
          placeholder="Units"
          onChange={(event) => searchForUnits(event)}
          value={ingredient?.measuringUnit}
        />
        <div
          id="dropdown"
          className={`z-10 ${openDropdown ? "" : "hidden"
            } max-h-60 absolute left-0 top-full mt-1 z-10  bg-white divide-y overflow-y-scroll   [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300 divide-gray-100 rounded-lg border border-slate-300 w-44`}
        >
          <ul
            className="py-2 text-base text-slate-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {filteredUnits.map((unit: string, unitIndex: number) => (
              <li onClick={() => dispatch(setMeasuingUnit({ value: unit, index, }))} className="block px-4 py-2 cursor-pointer hover:bg-gray-100" key={unitIndex}>
                {unit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-8 flex-1">
        <input
          className="border rounded w-full ml-4 py-2 px-3 border-slate-300 text-gray-700 bg-white focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
          value={ingredient?.name}
          name="name"
          onChange={(event) => handleIngredientChange(event)}
          type="text"
          placeholder="e.g: Bell Peppers"
        />
        <DeleteIcon
          className="cursor-pointer text-red-500"
          onClick={() => dispatch(removeIngredientState(index))}
        />
      </div>
    </div>
  );
};

const InstructionCard = ({ instruction }: { instruction: Instruction }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: instruction.id });


  const dispatch = useDispatch();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    marginBottom: "5px",
    border : "none !important"
  };


  const handleInstructionChange = (event: any) => {
    dispatch(
      setInstructionState({
        value: event.target.value,
        id: instruction.id,
      })
    );
  };

  return (
    <div className="flex gap-1 mb-2.5" ref={setNodeRef} style={style}>
      <DragIndicatorIcon
        className="mt-0.5 text-gray-700 cursor-grab !border-none"
        {...attributes}
        {...listeners}
        aria-describedby="DndDescribedBy"
      />
      <h3 className="text-lg text-gray-700 mt-0.5">{instruction.order}</h3>
      <textarea
        name="name"
        value={instruction.name}
        onChange={(event) => handleInstructionChange(event)}
        rows={3}
        className="p-2.5 mx-3 w-full text-base text-gray-700 bg-white rounded-lg border border-slate-300 focus:border-gray-700 focus:ring-gray-700 focus:border-1.75 focus:outline-none"
        placeholder="Preheat the oven to 375°F. Grease a baking tray before placing the dough."
      />

      <div className="flex items-center">
        <DeleteIcon
          className="cursor-pointer text-red-500"
          onClick={() => dispatch(removeInstructionState(instruction.id))}
        />
      </div>
    </div>
  );
};

// ingredients: { type: new GraphQLList(IngredientType) },
// instructions: { type: new GraphQLList(InstructionType) },
