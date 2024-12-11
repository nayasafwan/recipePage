"use client";
import Navbar from "./components/navbar";
import Appbar from "./components/appbar";
import RecipeCard from "./components/recipeCard";
import {Recipe} from "./interfaces/interface";
import { useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";

// const recipes : Recipe[] = [
//   {
//     id: "1",
//     name: "Pancakes",
//     category: "Breakfast",
//     image:
//       "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     cookingTime: "30 mins",
//     createdAt: "2021-05-20",
//   },
//   {
//     id: "2",
//     name: "Spaghetti",
//     category: "Lunch",
//     image:
//       "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     cookingTime: "60 mins",
//     createdAt: "2021-05-21",
//   },
//   {
//     id: "3",
//     name: "Pizza",
//     category: "Dinner",
//     image:
//       "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     cookingTime: "120 mins",
//     createdAt: "2021-05-22",
//   },
//   {
//     id: "4",
//     name: "Pizza",
//     category: "Dinner",
//     image:
//       "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     cookingTime: "120 mins",
//     createdAt: "2021-05-22",
//   }
// ];

export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(()=>{

    const fetchRecipes = async() =>{
      try{
        const response : AxiosResponse = await axios.post(`http://localhost:8000/graphql`, 
            {
          query : `query {
              recipes (
                skip : 0,
                take : 10
              ){
                id,
                name,
                description,
                cookingTime,
                image,
                createdAt,
                category
              }
            }`
          })

          if(response.status === 200) {
            setRecipes(response.data.data.recipes)
          }

      }
    
      
      catch(error){
        console.log(error)
      }
    }

    fetchRecipes()
  }, [])

  console.log(recipes)
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 ">
        <Appbar />
        {/*******************************************   Recipe Cards    ************************************************ */}
        <div className="grid grid-cols-3 gap-4 p-10">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
