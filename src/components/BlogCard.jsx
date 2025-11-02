import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helper/RouteName'
import BlogLike from './BlogLike'
import { FaRegComment } from 'react-icons/fa'


const BlogCard = ({ blog }) => {


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3 ">

                    <Avatar>
                        <AvatarImage src={`${blog?.author?.profile}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h2>{blog?.author?.fullname.split(" ")[0]}</h2>
                </div>
            </CardHeader>
            <CardContent>
                <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
                    <img src={blog?.blogimg} className='w-full' alt="" />
                </Link >
                <div className=' mt-2 text-sm'>

                    <div className='flex items-center justify-between'>
                        <div >
                            <div className='flex'>
                                <Calendar className='size-5' /> <span className='mx-2 '>{blog?.createdAt.split("T")[0]}</span>
                            </div>
                        </div>
                        <div>
                            <div className=" gap-1 ">

                                <BlogLike blogid={blog?._id} />

                            </div>
                        </div>

                    </div>
                </div>
                <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
                    <h2 className='text-2xl font-bold line-clamp-2'>{blog?.title}</h2>
                </Link >
            </CardContent>

        </Card >
    )
}

export default BlogCard