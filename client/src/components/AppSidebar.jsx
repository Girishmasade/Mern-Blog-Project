import React from 'react'
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
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo-white.png'
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";


const AppSidebar = () => {
    return (
        <Sidebar>
          <SidebarHeader className='bg-white'>
            <img src={logo} alt="Logo" width={120}/>
          </SidebarHeader>
          <SidebarContent className='bg-white'>

            <SidebarGroup>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                        <IoHomeSharp />
                            <Link to='/'>Home</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                        <BiSolidCategoryAlt />
                            <Link to='/category-details'>Categories</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                     <SidebarMenuItem>
                        <SidebarMenuButton>
                        <FaBloggerB />
                            <Link to='/blog-details'>Blogs</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                        <FaComments />
                            <Link to='/'>Comments</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                        <FaUserAlt />
                            <Link to='/'>Users</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Categories</SidebarGroupLabel>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                        <GoDotFill />
                            <Link to='/'>Categories item</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroup>

          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      )
}

export default AppSidebar
