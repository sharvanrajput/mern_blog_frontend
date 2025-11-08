import React from 'react'
import logo from "../assets/images/logo-white.png"
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { Input } from './ui/input'
import SearchBar from './SearchBar'
import { SidebarTrigger } from './ui/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { CiLogout } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { toast } from 'react-toastify'
import { Logout } from '@/api/baseUrl'
import { removeUser } from '@/redux/user.slice'
import { RouteProfile, RouteSignin } from '@/helper/RouteName'
import usericon from "@/assets/images/user.png"
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { ThemeToggle } from './ToggleTheme'
import Cookies from 'js-cookie'

const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = Cookies.get("token");
    
    const handleLogout = async () => {
        try {
            
            const res = await Logout()
            dispatch(removeUser())
            toast.success(res.data.message)
            navigate(RouteSignin)
            console.log(token);
            console.log("inner token", token)
            console.log("outer token", token)

        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className='flex justify-between items-center h-16 fixed w-full z-20 px-5  border-b bg-sidebar py-2'>
            <div className=' flex  items-center'>
                <Link to={"/"} className='cursor-pointer'>
                    <img src={logo} className="w-[120px]" alt="" />
                </Link>
                <SidebarTrigger />
            </div>
            <div>
                {/* <SearchBar /> */}
            </div>
            <div className='flex items-center gap-5'>
                <ThemeToggle />
                {
                    !user.isLoggedIn ?
                        <Button asChild className={"rounded-full"}>
                            <Link to={"/sign-in"}>
                                <LogIn />
                                Sign in
                            </Link>
                        </Button>
                        :
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={`${user.user.profile}` || usericon} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        <p>{user.user.fullname}</p>
                                        <p className='text-sm  font-normal'>{user.user.email}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to={RouteProfile}>
                                            <FaUserAlt />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="">
                                            <FaPlus />
                                            Create Blog
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />


                                    <DropdownMenuItem variant={"destructive"} onClick={handleLogout} >
                                        {/* <Button className={"w-full"} variant={"destructive"} onClick={handleLogout}> */}
                                        <CiLogout className='text-white' />
                                        Logout
                                        {/* </Button> */}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </>
                }
            </div>
        </div>
    )
}

export default Header