import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@/components/ThemeProvier'

const Layout = () => {
   
    return (
        <div>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SidebarProvider>
                    <AppSidebar />
                    <Header />
                    <main className='w-full '>
                        <div className='min-h-[calc(100vh-50px)] px-3 py-20'>

                            <Outlet />
                        </div>
                        <Footer />
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        </div>
    )
}

export default Layout