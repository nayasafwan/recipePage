"use client";
import { useState, useRef, useEffect } from "react";
import { Category } from "../interfaces/interface";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/recipeSlider";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalComponent from "./parent/modal";

const categories = [
  {
    name: "Breakfast",
    image: "/assets/Breakfast.jpeg",
  },
  {
    name: "Lunch",
    image: "/assets/Lunch.jpeg",
  },
  {
    name: "Dinner",
    image: "/assets/Dinner.jpeg",
  },
  {
    name: "Snacks",
    image: "/assets/Snacks.jpeg",
  },
  {
    name: "Appetizer",
    image: "/assets/Appetizer.jpeg",
  },
  {
    name: "Beverage",
    image: "/assets/Beverage.jpeg",
  },
  {
    name: "Dessert",
    image: "/assets/Dessert.jpeg",
  },
  {
    name: "Soup",
    image: "/assets/Soup.jpeg",
  },
  {
    name: "Salad",
    image: "/assets/Salad.jpeg",
  },
];

{
  /*******************************************Categories in home page**************************************************** */
}
export default function Categories() {
  const selectedCategory = useSelector((state: any) => state.recipe.category);

  const visibleCategories = () => {
    if (!selectedCategory) return categories.slice(0, 5);

    const index = categories.findIndex(
      (category) => category.name === selectedCategory
    );
    if (index === -1 || index < 5) return categories.slice(0, 5); // If not found, return first 5

    const selected = categories[index]; // Get the selected category
    const filtered = categories.filter((_, i) => i !== index).slice(0, 4); // Take first 4 excluding selected
    return [...filtered, selected]; // Append selected category at the end
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold text-3xl">Categories</h3>
        <h4
          onClick={() => setIsOpen(true)}
          id="category-modal-btn"
          className="font-semibold text-2xl text-primary cursor-pointer hover:text-orange-400"
        >
          View all
        </h4>
      </div>
      <div className="flex gap-4">
        {visibleCategories().map((category) => (
          <CategoryCard
            isModal={false}
            category={category}
            key={category.name}
            onClose={null}
          />
        ))}
      </div>

      <CategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

{
  /*******************************************Category Card**************************************************** */
}
const CategoryCard = ({
  category,
  isModal,
  onClose,
}: {
  category: Category;
  isModal: boolean;
  onClose: (() => void) | null;
}) => {
  const [hoverEffect, setHoverEffect] = useState(false);
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state: any) => state.recipe.category);

  const handleCategorySelected = () => {
    if (selectedCategory === category.name) {
      return;
    }
    dispatch(setCategory(category.name));

    if (onClose) {
      console.log("onClose");
      onClose();
    }
  };

  return (
    <div
      key={category.name}
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      onClick={() => handleCategorySelected()}
      id={`category-${category.name}-${isModal ? "modal" : "home"}`}
      className={`bg-white relative hover:shadow-lg cursor-pointer border flex items-center justify-center rounded-lg ${
        isModal
          ? "w-60 h-60"
          : selectedCategory === category.name
          ? "border-red-600 border-3 flex-1 h-32"
          : "flex-1 h-32"
      } relative`}
      style={{
        backgroundImage: `url(${category.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "8rem", // Adjust as per your design
      }}
    >
      {/****************************************************Icon **************************/}
      {!isModal && category.name === selectedCategory && (
        <div
          onClick={() => dispatch(setCategory(""))}
          className="absolute cursor-pointer flex items-center justify-center z-10 bg-red-600 rounded-full shadow-md"
          style={{
            top: "-10px",
            left: "-10px",
          }}
          id={`category-${category.name}-close`}
        >
          <CancelIcon
            className="text-white hover:text-gray-200"
            style={{ fontSize: "27px" }}
          />
        </div>
      )}
      {/**Overlay */}
      <div
        className={`absolute inset-0 bg-black ${
          hoverEffect && selectedCategory !== category.name
            ? "opacity-50"
            : "opacity-30"
        }`}
      ></div>
      <h1 className="text-3xl font-semibold text-gray-200 z-10">
        {category.name}
      </h1>
    </div>
  );
};

const CategoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (!modalEl.current) {
        console.log("modalEl is null");
        return;
      }
      // if click was not inside of the element. "!" means not
      // in other words, if click is outside the modal element
      console.log("modalEl", event.target);
      if (!modalEl.current.contains(event.target)) {
        onClose();
      }
    };
    // the key is using the `true` option
    // `true` will enable the `capture` phase of event handling by browser
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  if (!isOpen) return null;
  return (
    <ModalComponent>
      <div
        ref={modalEl}
        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-3/5 w-full sm:h-auto"
      >
        {/* Modal Content */}
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h3 className="font-bold text-3xl mb-3">All Categories</h3>
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                isModal={true}
                category={category}
                key={category.name}
                onClose={() => onClose()}
              />
            ))}
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
    </ModalComponent>
  );
};
