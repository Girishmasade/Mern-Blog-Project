import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useFetch } from "@/hooks/use-fetch";
import { getEnv } from "@/utils/getEnv";
import { RouteBlogByCategory } from "@/utils/router";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} alt="Logo" width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHomeSharp />
                <Link to="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn 
            ?
            <>
              <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaBloggerB />
                    <Link to="/blog-details">Blogs</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaComments />
                    <Link to="/comments">Comments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </>
            :
            <></>
          }

            {user && user.isLoggedIn && user.user.role === "admin" 
            ?
            <>
                 <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BiSolidCategoryAlt />
                    <Link to="/category-details">Categories</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaUserAlt />
                    <Link to="/user">Users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </>
            :
            <></>
            }
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton>
                    <GoDotFill />
                    <Link to={RouteBlogByCategory(item.slug)}>{item.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;