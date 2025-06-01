"use client";
import ProtectedRoute from "@/app/components/parent/protectedRoute";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import api from "@/app/utils/api";
import RecipeCard from "@/app/components/recipeCard";
import { Recipe } from "../../interfaces/interface"

export default function CreateRecipe() {

    const [userRecipes, setUserRecipes] = useState<Recipe[]>()

    useEffect(()=>{

        const fetchRecipes = async () =>{
             const response: AxiosResponse = await api.post("/graphql",
            {
                query: `query {
                    user {
                        recipes {
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
                    }
                }`
            })
          console.log(response.data.data.user.recipes)
          setUserRecipes(response.data.data.user.recipes)
        }
        
        fetchRecipes()
    }, [])

    console.log(userRecipes)
    return (
        <ProtectedRoute>
             <h3 className="mb-3 mt-10 font-bold text-3xl ">My Recipes</h3>
             <div className="grid grid-cols-3 gap-6">
                {userRecipes && userRecipes.map((recipe) => (
                    <RecipeCard showEdit={true} key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </ProtectedRoute>
    )
}