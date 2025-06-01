"use client";
import RecipeForm from "@/app/components/recipeForm";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import api from "@/app/utils/api";
import { useParams } from 'next/navigation';
import { setRecipe } from "@/app/redux/recipeFormSlider";

export default function EditRecipe() {

  return <RecipeForm/>
}
