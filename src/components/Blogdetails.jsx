import { AllComment, BlogBySlug } from '@/api/baseUrl'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import loadingimg from "@/assets/images/loading.svg"
import { decode } from 'entities'
import Comment from './Comment'
import { FaRegComment } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import BlogLike from './BlogLike'
import RelatedBlog from './RelatedBlog'

const Blogdetails = () => {

    const params = useParams()
    const { comments } = useSelector(state => state.comment)
    const slug = params.blog

    const [blogdata, setBlogData] = useState()
    const [loading, setLoading] = useState(false);


    const fatchbyslug = async () => {
        setLoading(true)
        try {
            const res = await BlogBySlug(slug)
            setBlogData(res.data.blog)
            setLoading(false)
            fatchcomment()
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    console.log("main blog",blogdata?.category)

    useEffect(() => {
        fatchbyslug()
    }, [slug])


    if (loading) return <div className="flex justify-center items-center h-[80vh] "><img src={loadingimg} alt="" /></div>

    return (

        <div className='grid lg:grid-cols-3 grid-cols-1 gap-5'>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <h1 className='text-2xl font-bold'>{blogdata?.title}</h1>
                        <div className='flex items-center justify-between'>
                            <div className="flex  gap-3 ">

                                <Avatar>
                                    <AvatarImage src={`${blogdata?.author?.profile}`} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className='text-md font-semibold'>{blogdata?.author?.fullname}</h2>
                            </div>
                            <div className="flex items-center gap-1 ">

                                <BlogLike blogid={blogdata?._id} />

                                <FaRegComment className='text-primary' />
                                <h2 className='text-md font-semibold'>{comments.length}</h2>
                            </div>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <img src={blogdata?.blogimg} alt="" />
                        <div className="mt-3">

                            <div dangerouslySetInnerHTML={{ __html: decode(blogdata?.blogcontent || "") }}></div>
                            {/* <div dangerouslySetInnerHTML={{ __html: decode(blogdata?.blogcontent || "") }}></div> */}
                        </div>
                    </CardContent>
                    <CardFooter >
                        <div className='w-full'>

                            <div className='border-t-2 w-full mt-5 pt-6'>
                                <Comment blogid={blogdata?._id} />
                            </div>

                        </div>

                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-1">

                <Card>
                    <CardContent>
                        <RelatedBlog category={blogdata?.category} slug={blogdata?.slug} />
                    </CardContent>
                </Card>
            </div>

        </div >
    )
}

export default Blogdetails