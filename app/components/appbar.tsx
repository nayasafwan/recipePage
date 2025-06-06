
"use client";
import Image from "next/image"
import { useEffect, useState } from "react"
import Profile from "../../public/assets/Profile.jpg"
import SearchIcon from "@mui/icons-material/Search"
import { useDispatch, useSelector } from "react-redux"
import { setSeachValue } from "../redux/recipeSlider"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import useAuth from "../utils/useAuth";
import Link from "next/link";

export default function Appbar() {


  const dispatch = useDispatch()

  const [toggleNotification, setToggleNotification] = useState(true)


  const { username = "Guest" }: { username?: String } = useAuth();

  const user = useSelector((state: any) => state.user.username)

  console.log(username)
    return (
        <div className="flex justify-between w-full py-4 h-20 px-8">
        {/*******************************************   Search Input    ************************************************ */}
      
        <div className="relative text-gray-400 focus-within:text-gray-600 w-1/2" >
          <SearchIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-2/3 left-3" />
          <input
            type="text"
            name="search"
            placeholder="Search for recipes"
            onChange={(e) => dispatch(setSeachValue(e.target.value)) }
            className="form-input border border-neutral-400 py-2 rounded-lg px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-12 focus:outline-none"
          />
        </div>


        <div className="flex items-center space-x-4">
          {/*********************************************** Create recipe ********************************************* */}
          <Link href="/recipe/create">
            <button className="bg-primary text-white py-2 px-3 hover:bg-orange-400 rounded-md">Add Recipe</button>
          </Link>
          {/*******************************************   Notification    ************************************************ */}
          <div className="cursor-pointer text-gray-900 hover:text-gray-950"  onClick={() => setToggleNotification(prev => !prev)}>
          {toggleNotification ?<NotificationsNoneOutlinedIcon className="opacity-80" sx={{fontSize : "32px"}}/> :
          <NotificationsOffOutlinedIcon className="opacity-80" sx={{fontSize : "32px"}}/>
          }
          </div>

          {/*******************************************   Profile    ************************************************ */}
          <div className="flex items-center space-x-2 min-w-40">
            <Image src={Profile} alt="Profile" className="rounded-full w-9 h-9 hover:ring-blue-400 hover:ring-2 cursor-pointer"/>
            <h3 id="username" className="text-sm font-medium text-gray-900 text-center pr-3">{username}</h3>
            <ExpandMoreOutlinedIcon className="text-gray-900 cursor-pointer hover:text-gray-950" sx={{fontSize : "18px"}}/>
            </div>
          </div>

      </div>
    )
}