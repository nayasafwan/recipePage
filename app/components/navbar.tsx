"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";

const list = [
  {
    name: "Home",
    link: "/",
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
    icon : <AddIcon sx={{fontSize : 28}}/>
  }
];



export default function Navbar() {

  const router = useRouter();  
  const pathname = usePathname();

  const handleNavigation = (link: any) => {
    if (!link) return;
    router.push(link);
  }

  {/*******************************************   Drawer    ************************************************ */}
  return (
      <div className="w-2/12 h-full bg-beige text-gray-950">
        <div className="flex justify-center items-center bg-beige">
          <h1 className="mt-5 text-5xl font-bold italic valentrix">All<span className="text-primary">Recipes</span></h1>
        </div>
        <div className="py-4">
          <ul className="space-y-2 text-secondary font-sans font-medium">
            {list.map((item, index) => (
              <li onClick={()=> handleNavigation(item.link)} key={index} className="p-1 cursor-pointer rounded-md">
                <div className={`flex items-center gap-4 p-2 rounded-lg ${pathname === item.link ? "bg-primary text-white hover:bg-orange-400" : "hover:bg-red-100"}`}>
                  <div>{item.icon}</div>
                  <p className="text-xl ms-3">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
