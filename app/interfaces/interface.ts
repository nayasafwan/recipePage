interface Recipe {
    id: string;
    name: string;
    category: string;
    image: string;
    cookingTime: string;
    createdAt: string;
}

interface Category {
    name: string;
    image: string;
}



export type { Recipe, Category };