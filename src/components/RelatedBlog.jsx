import { GetRelatedBlog } from '@/api/baseUrl'
import { RouteBlogDetails } from '@/helper/RouteName'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const RelatedBlog = ({ category, slug }) => {
    const [relatedblog, setRelatedBlog] = useState([])

    const param = useParams()
    const categoryname = param.category

    const fetchRelatedBlog = async () => {
        try {
            const res = await GetRelatedBlog(category, slug)
            setRelatedBlog(res?.data?.blog)
            console.log("related blog res", res)
        } catch (error) {
            // toast.error(error?.response?.data?.message)
        }
    }

    const categorys = useSelector(state => state.category)
    const categorydata = categorys?.category?.filter((cat) => cat._id === category)




    console.log("blog cat data ", categorys)

    useEffect(() => {
        fetchRelatedBlog()
    }, [])

    return (
        <div>
            <h3 className='text-lg text-semibold mb-3'>RelatedBlog</h3>
            {
                relatedblog?.map((ele) => (
                    <Link key={ele._id} to={RouteBlogDetails(categoryname, ele.slug)}>
                        <div className="flex items-center gap-2 mb-3">
                            <img src={ele.blogimg} className='w-[100px] h-[70px] object-cover rounded-md' alt="" />
                            <h4 className='line-clamp-2 text-lg font-semibold0'>{ele.title}</h4>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default RelatedBlog