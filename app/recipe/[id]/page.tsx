"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import  { AxiosResponse } from "axios";
import { Recipe } from "../../interfaces/interface";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { formatCategory, formatDate } from '@/app/utils/helper';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import api from "../../utils/api"

const RecipePage = () => {

  const { id } = useParams() as { id: string };

  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {

    const fetchRecipe = async () => {
      try {
        const response: AxiosResponse = await api.post("/graphql", {
          query: `query {
            recipe(id: "${id}") { ... on Recipe {
                id,
                name,
                description,
                cookingTime,
                image,
                createdAt,
                category,
                ingredients {
                  name,
                  quantity,
                  measuringUnit
                },
                instructions {
                  order,
                  name
                }
              }
              ... on ErrorMessage {
                message,
                code
              }
            }
          }
          `
        })

        if (!response.data.data.message) {
          setRecipe(response.data?.data?.recipe)
        }
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    };

    fetchRecipe();

  }, []);

  const arrangeInstructions = (instructions: any) => {
    const sortedInstructions = instructions.sort((a: any, b: any) => a.order - b.order);
    return sortedInstructions;
  }



  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
      <div className="">
        <h1 className="text-3xl font-semibold">{recipe.name}</h1>
        <p className="text-gray-500">{recipe.description}</p>
        <img src={recipe.image} alt={recipe.name} className="w-full h-96 object-cover mt-4" />
        {/**************************************Cooking time and category************************************************ */}
        {/* <div className='flex items-center gap-4 mt-4 justify-between'>
          <div className="flex items-center justify-start gap-0.5">
            <TimerOutlinedIcon sx={{ fontSize: "26px" }} />
            <p className='text-base'>{recipe.cookingTime}</p>
          </div>
          <span className=" text-primary text-base font-medium me-2 px-2.5 py-0.5 rounded-sm border border-primary">{formatCategory(recipe.category)}</span>
        </div> */}
        <div className="flex items-start mt-4 gap-4">
          <div className='border-r pr-4 border-gray-400'>
            <p className='text-gray-600'>COOKING TIME</p>
            <div className="flex mt-1 items-center justify-start gap-0.5">
              <TimerOutlinedIcon sx={{ fontSize: "26px" }} />
              <p className='text-base'>{recipe.cookingTime}</p>
            </div>
          </div>
          <div className='border-r px-4 flex flex-col gap-1 border-gray-400'>
            <p className='text-gray-600'>CATEGORY</p>
            
            <span className=" text-primary text-base font-medium me-2 px-2.5 py-0.5 rounded-sm border border-primary">{formatCategory(recipe.category)}</span>
          </div>
          <div className='border-r px-4 flex flex-col gap-1 border-gray-400'>
            <p className='text-gray-600'>CREATED AT</p>
            <p className='text-base'>{formatDate(recipe.createdAt)}</p>
          </div>
          </div>
        {/**************************************Ingredients************************************************ */}
        <div className='mt-6'>
          <h3 className='text-2xl font-semibold mb-4'>Ingredients</h3>
          <ul className='list-none space-y-4'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='text-lg flex items-center gap-2'>
                <CircleOutlinedIcon sx={{ fontSize: "16px" }} />
                <p>{ingredient.quantity} {ingredient.measuringUnit} {ingredient.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-6'>
          <h3 className='text-2xl font-semibold mb-4'>Instructions</h3>
          <ul className='list-none space-y-4'>
            {arrangeInstructions(recipe.instructions).map((instruction: { name: string; order: number }) => (
              <li key={instruction.order} className='text-lg flex items-center gap-2'>
                <span className='bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full font-medium text-sm'>{instruction.order}</span>
                <p>{instruction.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default RecipePage;
