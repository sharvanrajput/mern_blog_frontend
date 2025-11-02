import { Calendar, Circle, Disc, DotIcon, Home, Inbox, Layers2, MessageCircle, Rss, Search, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BiCategoryAlt } from "react-icons/bi";

import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo-white.png"
import { RouteBlog, RouteCategorie, RouteIndex } from "@/helper/RouteName"
import { Link, useNavigate } from "react-router-dom";
import { AllCagetory } from "@/api/baseUrl";
import { useSelector } from "react-redux";

// Menu items.


const allItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "My Blogs", url: RouteBlog, icon: Rss },
    { title: "Categorys", url: RouteCategorie, icon: Layers2, role: "admin" },
    // { title: "Comments", url: "#", icon: MessageCircle },
    // { title: "Users", url: "#", icon: User, role: "admin" },
];



const AppSidebar = () => {

    const [categorydata, setCategorydata] = useState([])
    const navigate = useNavigate()
    const userdata = useSelector(state => state.user)



    const fatchcategory = async () => {
        const cat = await AllCagetory()
        setCategorydata(cat?.data?.allCategory)
    }

    useEffect(() => {
        (async () => {
            await fatchcategory()
        })()

    }, [])

    const items = allItems.filter(item => !item.role || item.role === userdata?.user?.role)


    const handleCategoryClick = (slug) => {
        navigate(`?category=${slug}`)
    }
    const handleCategoryAll = (slug) => {
        navigate(`?category=${slug}`)
    }


    return (
        <Sidebar>
            <SidebarHeader className={""}>
                <img src={logo} className="w-[120px]" alt="" />
            </SidebarHeader>
            <SidebarContent className={""}>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem >
                                <SidebarMenuButton onClick={() => handleCategoryAll("All")} >
                                    <Circle />
                                    <span>All </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {
                                categorydata?.map((cat) => (
                                    <SidebarMenuItem key={cat._id}>
                                        <SidebarMenuButton onClick={() => handleCategoryClick(cat.slug)} >
                                            <Circle />
                                            <span>{cat.category} </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar