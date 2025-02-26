import React, { useState } from "react";
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
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';

const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(removeUser());
      navigate("/sign-in");
      showToast("success", data.message);
    } catch (error) {
      showToast("error", data.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white border-b border-black/25 px-8">
      <div className="flex justify-center items-center gap-2">
      <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <AiOutlineMenu />
                </button>
                <Link to='/'>
                    <img src={logo} className='md:w-auto w-48' />
                </Link>
      </div>
      <div className="w-[400px]">
        <div
          className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <Search />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <IoMdSearch size={25} />
        </button>
        {!user.isLoggedIn ? (
          <Button asChild className="bg-purple-800 hover:bg-purple-700">
            <Link to="/sign-in">
              <IoMdLogIn />
              Sign in
            </Link>
          </Button>
        ) : (
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
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/profile">
                  <FaRegUser /> Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="add-blog">
                  <FaPlus /> Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <IoMdLogOut color="red" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
