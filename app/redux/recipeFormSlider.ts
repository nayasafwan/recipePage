import { createSlice } from "@reduxjs/toolkit";
import { Ingredient, Instruction } from "../interfaces/interface";
import { arrayMove } from "@dnd-kit/sortable";
import measuringUnit from "../data/measuringUnit.json"

const recipeForm = createSlice({
    name: "recipeForm",
    initialState: {
        recipe: {
            name: "",
            description: "",
            cookingTime: "",
            category: "",
            image: "",
            ingredients: [{
                name: "",
                quantity: "",
                measuringUnit: "",
            }] as Ingredient[],
            instructions: [{
                id: "1",
                name: "",
                order: 1
            }] as Instruction[]
        }
    },
    reducers: {
        setRecipe: (state, action) => {
            // Arrange instructions

            let arrangedInstructions = action.payload.instructions.sort((a : any , b : any) => a.order - b.order);

            action.payload.instructions = arrangedInstructions
            state.recipe = action.payload
        },

        setRecipeValue: (state, action) => {
            const { name, value } = action.payload
            state.recipe[name as keyof typeof state.recipe] = value
        },
        setIngredientState: (state, action) => {
            state.recipe.ingredients = state.recipe.ingredients.map((ingredient, index) => {
                if (index === action.payload.index) {
                    return { ...ingredient, [action.payload.name]: action.payload.value }
                }
                return ingredient
            })
        },
        addIngredientState: (state, action) => {
            state.recipe.ingredients.push(action.payload as Ingredient)
        },

        removeIngredientState: (state, action) => {
            state.recipe.ingredients = state.recipe.ingredients.filter((ingredient, ingIndex) => ingIndex !== action.payload)
        },

        setMeasuingUnit: (state, action) => {
            const { value, index } = action.payload
            console.log(value, index)
            state.recipe.ingredients = state.recipe.ingredients.map((ingredient, ingIndex) => {
                if (ingIndex === index) {
                    const abbreviation = measuringUnit[value as keyof typeof measuringUnit]
                    return { ...ingredient, measuringUnit: value, abbreviation }
                }
                return ingredient
            })
        },

        setInstructionState: (state, action) => {
            const { value, id } = action.payload

            state.recipe.instructions = state.recipe.instructions.map((instruction) => {
                if (instruction.id === id) {
                    return { ...instruction, name: value }
                }
                return instruction
            })
        },
        addInstructionState: (state, action) => {
            state.recipe.instructions.push(action.payload as Instruction)
        },
        removeInstructionState: (state, action) => {
            state.recipe.instructions = state.recipe.instructions.filter((instruction) => instruction.id !== action.payload)
        },
        rearrangeInstruction: (state, action) => {

            const {oldIndex , newIndex} = action.payload

            const newInstructions = arrayMove(state.recipe.instructions, oldIndex, newIndex)

            state.recipe.instructions = newInstructions.map((instruction, index) => {
                return { ...instruction, order: index + 1 }
            })
      
        }
    }
})

export const { setRecipe, setRecipeValue, addIngredientState, removeIngredientState, setIngredientState , setMeasuingUnit ,addInstructionState, removeInstructionState, rearrangeInstruction, setInstructionState } = recipeForm.actions;
export default recipeForm.reducer;
