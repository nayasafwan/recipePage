"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import AuthModal from "./auth";
import { setAuthModal } from "../redux/recipeSlider";
import { ToastContainer } from "react-toastify";

const list = [
  {
    name: "Home",
    link: "/recipe",
    icon: <HomeOutlinedIcon sx={{fontSize : 28}}/>,
  },
  {
    name: "Categories",
    // link: "/categories",
    icon: <GridViewOutlinedIcon sx={{fontSize : 28}}/>,
  },
  {
    name: "Favorites",
    // link: "/favorites",
    icon: <FavoriteBorderOutlinedIcon sx={{fontSize : 28}} />,
  },
  {
    name : "Create Recipe",
    link : "/recipe/create",
    icon : <AddIcon sx={{fontSize : 28}}/>,
    id : "create-recipe"
  }
];



export default function Navbar() {

  const router = useRouter();  
  const pathname = usePathname();


  const handleNavigation = (link: any, name : string) => {
    console.log(link)
    if (!link) return;
    else{
      console.log(link)
    router.push(link);
    }
  }

  const showAuthModal = useSelector((state : any) => state.recipe.showAuthModal)

  {/*******************************************   Drawer    ************************************************ */}
  return (
    <>
      <div className="w-2/12 h-full bg-beige text-gray-950">
        <div className="flex justify-center items-center bg-beige">
          <h1 className="mt-5 text-5xl font-bold italic valentrix">All<span className="text-primary">Recipes</span></h1>
        </div>
        <div className="py-4">
          <ul className="space-y-2 text-secondary font-sans font-medium">
            {list.map((item, index) => (
              <li id={item.id} onClick={()=> handleNavigation(item.link, item.name)} key={index} className="p-1 cursor-pointer rounded-md">
                <div className={`flex items-center gap-4 p-2 rounded-lg ${pathname === item.link ? "bg-primary text-white hover:bg-orange-400" : "hover:bg-red-100"}`}>
                  <div>{item.icon}</div>
                  <p className="text-xl ms-3">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showAuthModal && <AuthModal />}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        theme="colored"
      />
      </>
  );
}
