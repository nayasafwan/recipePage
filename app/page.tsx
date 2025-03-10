import { redirect } from "next/navigation";

export default function Home() {

  redirect("/recipe")
  
}


//use memo memoizes the return value of function
//use callback memoizes the function itself