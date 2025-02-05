"use client";
import RecipeCard from "./components/recipeCard";
import { Recipe } from "./interfaces/interface";
import { useEffect, useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import Categories from "./components/categorie";
import { useSelector } from 'react-redux';
import Layout from "./components/layout";


export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const category = useSelector((state: any) => state.recipe.category)
  const searchValue = useSelector((state: any) => state.recipe.searchValue)



  const [page, setPage] = useState(0)

  const limit = 12
  const prevStateRef = useRef({ page, category, searchValue });

  useEffect(() => {

    const prevState = prevStateRef.current;

    prevStateRef.current = { page, category, searchValue };

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    const fetchRecipes = async () => {
      try {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
          {
            query: `query {
              recipes (
                skip : ${page * limit},
                take : ${limit},
                category : "${category}",
                search : "${searchValue}"
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

        if (response.status !== 200) {
          return
        }

        //Add new recipes (pagination)
        if (prevState.page !== page) {
          setRecipes(prevState => {
            return [...prevState, ...response.data.data.recipes]
          })
        }

        //Filter recipes by category or search value
        else {
          setRecipes(response.data.data.recipes)
        }

      }

      catch (error) {
        console.log(error)
      }
    }

    fetchRecipes()

  }, [page, category, searchValue])



  return (
    <Layout>

      <Categories />
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
    </Layout>
  );
}


//use memo memoizes the return value of function
//use callback memoizes the function itself