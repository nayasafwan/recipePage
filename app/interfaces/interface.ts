interface Ingredient {
    name: string;
    quantity: string;
    measuringUnit: string;
}

interface Instruction {
    name: string;
    order: number;
}

interface Recipe {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    cookingTime: string;
    createdAt: string;
    ingredients : Ingredient[];
    instructions : Instruction[];
}


interface Category {
    name: string;
    image: string;
}



export type { Recipe, Category };