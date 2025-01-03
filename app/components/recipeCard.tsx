import { Recipe } from "../interfaces/interface";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  function formatDate(date: string) { 
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", options).format(newDate);
  }


  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase();
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/*******************************************   Image    ************************************************ */}
      <img
        className="w-full h-44 object-cover object-center"
        src={recipe.image}
        alt={recipe.name}
      />
      <div className="p-4 border-gray-300 rounded-b-lg border">
        <h5 className="text-base font-sm text-primary">
          {formatCategory(recipe.category)}
        </h5>
        <h1 className="text-lg font-semibold text-gray-800">{recipe.name}</h1>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center justify-start gap-0.5">
                <TimerOutlinedIcon fontSize="small"/>
          <p>{recipe.cookingTime}</p>
          </div>
          <h1 className="text-gray-700 text-sm mx-3">
            {formatDate(recipe.createdAt)}
          </h1>
        </div>
      </div>
    </div>
  );
}
