
import Image from "next/image"
import Profile from "../assets/profile.jpg"
import SearchIcon from "@mui/icons-material/Search"

export default function Appbar() {

    return (
        <div className="flex justify-between w-full py-4 h-20 px-10">
        {/*******************************************   Search Input    ************************************************ */}

        <div className="relative text-gray-400 focus-within:text-gray-600 w-2/5" >
          <SearchIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-2/3 left-3" />
          <input
            type="text"
            name="search"
            placeholder="Search for recipes"
            className="form-input border border-neutral-400 py-2 rounded-lg px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-12 focus:outline-none"
          />
        </div>

        {/*******************************************   Profile    ************************************************ */}
        <div >
            <Image src={Profile} alt="Profile" className="rounded-full w-11 h-11 hover:ring-blue-400 hover:ring-2 cursor-pointer"/>
          </div>
      </div>
    )
}