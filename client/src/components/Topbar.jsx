import React from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import Search from "./Search";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/utils/showToast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/utils/getEnv";

const Topbar = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

  const handleLogout = async() => {
       try {
           const response = await fetch(
             `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
             {
               method: 'get',
               credentials: "include",
             }
           );
           const data = await response.json()
           if (!response.ok) {
            return showToast('error', data.message)
           }
           dispatch(removeUser())
           navigate('/sign-in')
           showToast('success', data.message)
         } catch (error) {
           showToast('error', data.message)
         }
  }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white border-b border-black/25 px-8">
      <div className="">
        <img src={logo} alt="" />
      </div>
      <div className="w-[400px]">
        <Search />
      </div>
      <div>
        {!user.isLoggedIn ?
          <Button asChild className="bg-purple-800 hover:bg-purple-700">
            <Link to="/sign-in">
              <IoMdLogIn />
              Sign in
            </Link>
          </Button>
        : 
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || profileIcon} />
               
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to='/profile'>
                <FaRegUser /> Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to=''>
                <FaPlus /> Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator/>

              <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
             <IoMdLogOut color="red"/> Logout
              </DropdownMenuItem>


            </DropdownMenuContent> 
          </DropdownMenu>
        }
      </div>
    </div>
  );
};

export default Topbar;
