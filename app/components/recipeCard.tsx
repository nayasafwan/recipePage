"use client"
import { Recipe } from "../interfaces/interface";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useRouter } from 'next/navigation';
import { formatCategory } from "../utils/helper";
import { setRecipe } from "../redux/recipeFormSlider";
import { useDispatch } from "react-redux";

export default function RecipeCard({ recipe, showEdit = false }: { recipe: Recipe, showEdit? : boolean }) {

  const router = useRouter();
  const dispatch = useDispatch()

  /*  */
  function formatDate(date: string) {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", options).format(newDate);
  }



  const handleNavigation = () => {
    router.push(`/recipe/${recipe.id}`);
  }

  const handleEditNavigation = () =>{
    dispatch(setRecipe(recipe))
    router.push(`/recipe/edit/${recipe.id}`)
  }

  return (
    <div className="flex flex-col">
      <div onClick={() => handleNavigation()} id={`recipe-${recipe.id}`} className={`bg-white shadow-lg ${showEdit ? "rounded-t-lg" : "rounded-lg"} overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out`}>
        {/*******************************************   Image    ************************************************ */}
        <img
          className="w-full h-44 object-cover object-center"
          src={`assets/recipes/${recipe.image}`}
          alt={recipe.name}
        />
        <div className={`p-4 border-gray-300 ${!showEdit && "rounded-b-lg"}  border`}>
          <h5 className="text-base font-sm text-primary">
            {formatCategory(recipe.category)}
          </h5>
          <h1 className="text-lg font-semibold text-gray-800">{recipe.name}</h1>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center justify-start gap-0.5">
              <TimerOutlinedIcon fontSize="small" />
              <p>{recipe.cookingTime}</p>
            </div>
            <h1 className="text-gray-700 text-sm mx-3">
              {formatDate(recipe.createdAt)}
            </h1>
          </div>
        </div>
      </div>
      {showEdit && 
        <button onClick={()=> handleEditNavigation()} className="bg-primary hover:bg-orange-400 text-white py-2 rounded-b-lg">Edit</button>
      }
    </div>
  );
}
