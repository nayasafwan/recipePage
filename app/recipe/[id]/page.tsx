"use client";
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import Layout from "../../components/layout"
import { Recipe } from "../../interfaces/interface";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { formatCategory } from '@/app/utils/helper';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const RecipePage = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {

    const fetchRecipe = async () => {
      try {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
          query: `query {
            recipe(id: "${id}") {
              id,
              name,
              description,
              cookingTime,
              image,
              category,
              ingredients {
                name,
                quantity,
                measuringUnit
              },
              instructions {
                name,
                order
              }
            }
          }
          `
        })

        if (response.status === 200) {
          setRecipe(response.data.data.recipe)
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
    <Layout>
      <div className="">
        <h1 className="text-3xl font-semibold">{recipe.name}</h1>
        <p className="text-gray-500">{recipe.description}</p>
        <img src={recipe.image} alt={recipe.name} className="w-full h-96 object-cover mt-4" />
        {/**************************************Cooking time and category************************************************ */}
        <div className='flex items-center gap-4 mt-4 justify-between'>
          <div className="flex items-center justify-start gap-0.5">
            <TimerOutlinedIcon sx={{fontSize : "26px"}} />
            <p className='text-base'>{recipe.cookingTime}</p>
          </div>
          <span className=" text-primary text-base font-medium me-2 px-2.5 py-0.5 rounded-sm border border-primary">{formatCategory(recipe.category)}</span>
        </div>
        {/**************************************Ingredients************************************************ */}
        <div className='mt-6'>
          <h3 className='text-2xl font-semibold mb-4'>Ingredients</h3>
          <ul className='list-none space-y-4'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='text-lg flex items-center gap-2'>
                <CircleOutlinedIcon sx={{fontSize : "16px"}} />
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
    </Layout>
  );
};

export default RecipePage;
