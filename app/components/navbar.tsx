import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";


const list = [
  {
    name: "Home",
    link: "/",
    icon: <HomeOutlinedIcon sx={{fontSize : 28}}/>,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <GridViewOutlinedIcon sx={{fontSize : 28}}/>,
  },
  {
    name: "Favorites",
    link: "/favorites",
    icon: <FavoriteBorderOutlinedIcon sx={{fontSize : 28}} />,
  },
];



export default function Navbar() {


  {/*******************************************   Drawer    ************************************************ */}
  return (
      <div className="w-2/12 h-full bg-beige text-gray-950">
        <div className="flex justify-center items-center bg-beige">
          <h1 className="mt-5 text-5xl font-bold italic valentrix">All<span className="text-primary">Recipes</span></h1>
        </div>
        <div className="py-4">
          <ul className="space-y-2 text-secondary font-sans font-medium">
            {list.map((item, index) => (
              <li key={index} className="p-2 cursor-pointer">
                <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 ">
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
