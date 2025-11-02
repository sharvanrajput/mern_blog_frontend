import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className=' flex justify-center bg-sidebar py-3'>
            <Copyright /> {new Date().getFullYear()} | Design and Developed by Sharvan
        </div>
    )
}

export default Footer