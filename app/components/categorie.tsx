"use client";
import Image from "next/image"
import { useState } from "react"
import { Category } from "../interfaces/interface"

const categories = [
    {
        "name": "Breakfast",
        "image": "/assets/Breakfast.jpeg"
    },
    {
        "name": "Lunch",
        "image": "/assets/Lunch.jpeg"
    },
    {
        "name": "Dinner",
        "image": "/assets/Dinner.jpeg"
    },
    {
        "name": "Snacks",
        "image": "/assets/Snacks.jpeg"
    },
    {
        "name": "Appetizer",
        "image": "/assets/Appetizer.jpeg"
    },
    {
        "name": "Beverage",
        "image": "/assets/Beverage.jpeg"
    },
    {
        "name": "Dessert",
        "image": "/assets/Dessert.jpeg"
    },
    {
        "name": "Soup",
        "image": "/assets/Soup.jpeg"
    },
    {
        "name": "Salad",
        "image": "/assets/Salad.jpeg"
    }
]

export default function Categories() {

    const visibleCategories = categories.slice(0, 5)

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="flex justify-between mb-2">
                <h3 className="font-bold text-3xl">Categories</h3>
                <h4 onClick={()=> setIsOpen(true)} className="font-semibold text-2xl text-primary cursor-pointer hover:text-orange-400">View all</h4>
            </div>
            <div className="flex gap-4">
                {visibleCategories.map((category) => (
                    <CategoryCard  isModal={false} category={category} key={category.name} />
                ))}
            </div>

            <CategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    )
}

const CategoryCard = ({ category, isModal }: { category: Category, isModal: boolean }) => {

    const [hoverEffect, setHoverEffect] = useState(false)

    return (
        <div key={category.name}
            onMouseEnter={() => setHoverEffect(true)}
            onMouseLeave={() => setHoverEffect(false)}
            className={`bg-white hover:shadow-lg cursor-pointer border flex items-center justify-center rounded-lg ${isModal ? "w-60 h-60" : "flex-1 h-32"} overflow-hidden relative`}
            style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '8rem', // Adjust as per your design
            }
            }
        >
            {/**Overlay */}
            <div className={`absolute inset-0 bg-black ${hoverEffect ? "opacity-50" : "opacity-30"}`}></div>
            <h1 className="text-3xl font-semibold text-gray-200 z-10">{category.name}</h1>

        </div>
    )
}


const CategoryModal = ({isOpen, onClose} : {isOpen : boolean, onClose : () => void}) => {

    if (!isOpen) return null
    return (
        <div onBlur={onClose} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Background backdrop */}
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    {/* Modal Panel */}
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-3/4 w-full sm:h-auto">
                        {/* Modal Content */}
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h3 className="font-bold text-3xl mb-3">All Categories</h3>
                            <div className="flex flex-wrap gap-6">
                                {categories.map((category) => <CategoryCard isModal={true} category={category} key={category.name} />)}
                            </div>
                        </div>
                        {/**************************************************** Modal Footer **************************/}
                        <div className="bg-gray-50 px-4 mt-6 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md bg-primary px-5 py-2 text-xl font-semibold text-white shadow-sm hover:bg-orange-400 sm:ml-3 sm:w-auto"
                            >
                                Close
                            </button>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}