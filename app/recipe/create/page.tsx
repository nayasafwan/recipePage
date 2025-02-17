"use client";
import Layout from "../../components/layout"
import ImageIcon from "../../../public/assets/ImageIcon.png"
import Image from "next/image"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useRef } from "react"
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Ingredient, Instruction } from "@/app/interfaces/interface";

export default function CreateRecipe() {

    const [createdRecipe, setCreatedRecipe] = useState({
        name: "",
        description: "",
        category: "",
        image: "",
        cookingTime: "",
        ingredients: [
            {
                name: "",
                quantity: "",
                measuringUnit: ""
            }
        ],
        instructions: [
            {
                name: "",
                order: 1
            }
        ]
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleInputChange = (event: any) => {

        setCreatedRecipe(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleImageChange = (event: any) => {
        console.log(event.target.files)
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setCreatedRecipe(prev => {
                return {
                    ...prev,
                    image: file
                }
            })
            setImageUrl(url);
        }
    }

    const addIngredient = () => {
        setCreatedRecipe(prev => {
            return {
                ...prev,
                ingredients: [...prev.ingredients, {
                    name: "",
                    quantity: "",
                    measuringUnit: ""
                }]
            }
        })
    }

    const addInstruction = () => {

        setCreatedRecipe(prev => {
            return {
                ...prev,
                instructions: [...prev.instructions, {
                    name: "",
                    order: prev.instructions.length + 1
                }]
            }
        })
    }


    const openFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }



    return (
        <Layout>
            <h1 className="text-3xl font-semibold">Create Recipe</h1>
            <div className="w-full flex flex-col gap-8 py-4 px-6 rounded-lg border border-slate-200 border-opacity-50 mt-4">
                <div>
                    <h2 className="text-lg font-medium mb-2">Recipe Title</h2>
                    <input
                        onChange={(event) => handleInputChange(event)}
                        value={createdRecipe.name}
                        name="name"
                        className="border rounded w-1/2 py-2 px-3 border-slate-300 text-gray-700 bg-gray-50" type="text" placeholder="Recipe Title" />
                </div>
                <div>
                    <h2 className="text-lg font-medium mb-2">Description</h2>
                    <textarea
                        onChange={(event) => handleInputChange(event)}
                        name="description"
                        value={createdRecipe.description} rows={4} className="p-2.5 w-full text-base text-gray-700 bg-gray-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description" />
                </div>
                <div>
                    <h2 className="text-lg font-medium mb-2">Image</h2>
                    {imageUrl ?
                        <img className="border-slate-300 object-contain w-full h-40 relative cursor-pointer"
                            onClick={() => openFile()}
                            src={imageUrl || ''} />
                        : <div className="border bg-gray-50 border-slate-300 flex-col border-dashed w-full h-40 py-8 flex items-center justify-center rounded-lg">
                            <Image src={ImageIcon} alt="upload image" className="w-12 h-12" />
                            <p className="text-base text-gray-600 mt-1">Click here to <span onClick={() => openFile()} className="text-blue-700 cursor-pointer">Upload a file</span></p>
                            <p className="text-sm text-gray-600 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>}
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
                    <h2 className="text-lg font-medium mb-2">Category</h2>
                    <select
                        onChange={(event) => handleInputChange(event)}
                        name="category"
                        value={createdRecipe.category}
                        className="bg-gray-50 border border-slate-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-1/2 p-2.5">
                        <option value="" disabled selected hidden>Select Category</option>
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
                    <h2 className="text-lg font-medium mb-2">Cooking Time</h2>
                    <input
                        placeholder="60"
                        onChange={(event) => handleInputChange(event)}
                        name="cookingTime"
                        value={createdRecipe.cookingTime}
                        type="number"
                        className="border rounded w-14 py-1 px-2 border-slate-300 text-gray-700 bg-gray-50" />
                    <span className="ml-1.5">minutes</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-medium">Ingredients</h2>
                    {createdRecipe.ingredients.map((ingredient, index) =>
                        <IngredientCard key={index} index={index} ingredient={ingredient} setCreatedRecipe={setCreatedRecipe} />
                    )}
                </div>
                <button onClick={() => addIngredient()} className="border border-primary w-full hover:bg-gray-100 text-primary text-centers py-2.5 text-lg rounded-lg flex justify-center items-center">
                    <AddIcon />
                    <span className="ml-2">Add Ingredient</span>
                </button>
                <div className="mt-6">
                    <h2 className="text-lg font-medium">Instructions</h2>
                    {createdRecipe.instructions.map((instruction, index) => <InstructionCard key={index} index={index} instruction={instruction} setCreatedRecipe={setCreatedRecipe}/>)}
                </div>
                <button
                    onClick={() => addInstruction()}
                    className="border border-primary w-full hover:bg-gray-100 text-primary text-centers py-2.5 text-lg rounded-lg flex justify-center items-center">
                    <AddIcon />
                    <span className="ml-2">Add Instruction</span>
                </button>

                <div className="flex justify-end mt-6">
                    <button className="bg-primary hover:bg-orange-400 text-white w-40 text-centers py-2.5 text-lg rounded-lg">Create Recipe</button>
                </div>
            </div>
        </Layout>
    )
}


const IngredientCard = ({ ingredient, setCreatedRecipe, index }: { ingredient?: Ingredient, setCreatedRecipe: React.Dispatch<React.SetStateAction<any>>, index: number }) => {

    const [openDropdown, setOpenDropdown] = useState(false)

    const handleIngredientChange = (event: any) => {
        const { name, value } = event.target;

        setCreatedRecipe((prev: any) => {
            const newIngredients = prev.ingredients.map((ing: Ingredient, ingIndex: number) => {
                return ingIndex === index ? {
                    ...ing,
                    [name]: value
                } : ing
            })


            return {
                ...prev,
                ingredients: newIngredients
            }
        })
    }

    const removeIngredient = () => {

        setCreatedRecipe((prev: any) => {
            return {
                ...prev,
                ingredients: prev.ingredients.filter((ing: Ingredient, ingIndex: number) => ingIndex !== index)
            }
        })
    }

    return (
        <div className="flex mt-2">
            <input
                type="number"
                value={ingredient?.quantity}
                name="quantity"
                onChange={(event) => handleIngredientChange(event)}
                className="w-32 bg-gray-50 text-gray-950 border border-r-0 border-slate-200 rounded-md pl-3 transition duration-300 ease"
                placeholder="3" />
            <div className="relative">
                <div className=" flex items-center pr-3">
                    {/* <div className="h-6 border-l border-slate-200 mr-3"></div> */}
                    <button id="dropdownButton2"
                        onClick={() => setOpenDropdown(prev => !prev)}
                        onBlur={() => setOpenDropdown(false)}
                        className="h-full border-slate-200 border pl-3 pr-1 rounded-r-md flex justify-center items-center bg-gray-50 py-2 text-slate-700">
                        {ingredient?.measuringUnit || "Unit"}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <div id="dropdownMenu2" className={`min-w-[150px] overflow-hidden absolute left-0 mt-10 ${openDropdown ? "" : "hidden"} w-full bg-white border border-slate-200 rounded-md shadow-lg z-10`}>
                        <ul id="dropdownOptions2">
                            <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer">Dropdown 1</li>
                            <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer">Dropdown 2</li>
                            <li className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer">Dropdown 3</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 flex-1">
                <input className="border rounded w-full ml-4 py-2 px-3 border-slate-300 text-gray-700 bg-gray-50"
                    value={ingredient?.name}
                    name="name"
                    onChange={(event) => handleIngredientChange(event)}
                    type="text" placeholder="e.g: Bell Peppers" />
                <DeleteIcon className="cursor-pointer text-red-500" onClick={() => removeIngredient()} />
            </div>

        </div>
    )
}


const InstructionCard = ({ instruction, setCreatedRecipe, index }: { instruction: Instruction, setCreatedRecipe: React.Dispatch<React.SetStateAction<any>>, index: number }) => {

    const handleInstructionChange = (event: any) => {
        setCreatedRecipe((prev : any) =>{
            const newInstructions = prev.instructions.map((ins : Instruction, insIndex : number) => {
                return insIndex === index ? {
                    ...ins,
                    name : event.target.value
                } : ins
            })

            return {
                ...prev,
                instructions : newInstructions
            }
        })
    }

    const removeInstruction = () => {
        setCreatedRecipe((prev : any) => {
            return {
                ...prev,
                instructions : prev.instructions.filter((ins : Instruction, insIndex : number) => insIndex !== index)
            }
        })
    }

    return (
        <div className="flex gap-1 mb-2.5">
            <DragIndicatorIcon className="cursor-pointer mt-0.5 text-gray-500" />
            <h3 className="text-lg text-gray-600 mt-0.5">{instruction.order}</h3>
            <textarea 
            name="name"
            value={instruction.name}
            onChange={(event) => handleInstructionChange(event)}
            rows={3} className="p-2.5 mx-3 w-full text-base text-gray-700 bg-gray-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Preheat the oven to 375°F. Grease a baking tray before placing the dough." />

            <div className="flex items-center">
                <DeleteIcon className="cursor-pointer text-red-500" onClick={()=> removeInstruction()}/>
            </div>
        </div>
    )
}

// ingredients: { type: new GraphQLList(IngredientType) },
// instructions: { type: new GraphQLList(InstructionType) },