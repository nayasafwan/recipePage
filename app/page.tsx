"use client";
import Navbar from "./components/navbar";
import Appbar from "./components/appbar";
import RecipeCard from "./components/recipeCard";
import {Recipe} from "./interfaces/interface";
import { useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";
import Categories from "./components/categorie";


export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([])

  const [page, setPage] = useState(0)

  const limit = 12


  useEffect(()=>{

    const fetchRecipes = async() =>{
      try{
        const response : AxiosResponse = await axios.post(`http://localhost:8000/graphql`, 
            {
          query : `query {
              recipes (
                skip : ${page * limit},
                take : ${limit}
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
            setRecipes(prevState =>{
              return [...prevState, ...response.data.data.recipes]
            })
          }

      }
    
      
      catch(error){
        console.log(error)
      }
    }

    fetchRecipes()
  }, [page])

  console.log(recipes)
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 ">
        <Appbar />
        
        <div className="p-10">

          <Categories/>
          {/*******************************************   Recipe Cards    ************************************************ */}
        <h3 className="mb-2 mt-10 font-bold text-3xl">Browse recipes</h3>
          <div className="grid grid-cols-4 gap-6">
            {recipes && recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          {/*******************************************   Pagination    ************************************************ */}
          <div className="flex justify-center mt-10">
            <button 
            onClick={() => setPage(page => page + 1)}
            className="bg-primary hover:bg-orange-400 text-white w-72 text-centers py-3 text-lg rounded-lg">Load more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
