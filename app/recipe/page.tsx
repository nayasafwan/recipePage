"use client";
import RecipeCard from "../components/recipeCard";
import { Recipe } from "../interfaces/interface";
import { useEffect, useState, useRef } from "react";
import { AxiosResponse } from "axios";
import Categories from "../components/categorie";
import { useSelector } from 'react-redux';
import api from "../utils/api"
import LoginModal from "../components/auth";

export default function HomePage() {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [count, setCount] = useState<number>()
  const category = useSelector((state: any) => state.recipe.category)
  const searchValue = useSelector((state: any) => state.recipe.searchValue)



  const [page, setPage] = useState(0)

  const limit = 12
  const prevStateRef = useRef({ page, category, searchValue });

  useEffect(() => {

    const prevState = prevStateRef.current;

    prevStateRef.current = { page, category, searchValue };

    const fetchRecipes = async () => {
      try {
        const response: AxiosResponse = await api.post("/graphql",
          {
            query: `query {
              recipes (
                skip : ${page * limit},
                take : ${limit},
                category : "${category}",
                search : "${searchValue}"
              ){
                recipes {
                  id,
                  name,
                  description,
                  cookingTime,
                  image,
                  createdAt,
                  category
                },
                count
              }
            }`
          })

        if (response.status !== 200) {
          return
        }

        //Add new recipes (pagination)
        if (prevState.page !== page) {
          setRecipes(prevState => {
            return [...prevState, ...response.data.data?.recipes?.recipes]
          })

        }

        //Filter recipes by category or search value
        else {
          console.log(response.data.data)
          setRecipes(response.data.data?.recipes?.recipes)
          setCount(response.data.data?.recipes?.count)
        }

      }

      catch (error) {
        console.log(error)
      }
    }

    fetchRecipes()

  }, [page, category, searchValue])


  return (
    <>

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
          disabled={recipes.length === count}
          className={`bg-primary text-white w-72 ${recipes.length === count ? "opacity-60" : "hover:bg-orange-400"} text-centers py-3 text-lg rounded-lg`}>Load more</button>
      </div>

    </>
  );
}


//use memo memoizes the return value of function
//use callback memoizes the function itself