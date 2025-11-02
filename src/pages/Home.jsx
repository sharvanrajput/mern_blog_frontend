import { Allblog, GetAllUserBlog } from '@/api/baseUrl'
import BlogCard from '@/components/BlogCard'
import { unsetComment } from '@/redux/coments.slice'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import loadingimg from "@/assets/images/loading.svg"
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [Blogs, setBlogs] = useState()
  const [loading, setLoading] = useState(false)
  const [searchparams] = useSearchParams()
  const category = searchparams.get("category")
  const dispatch = useDispatch()

  const fatchBlogs = async () => {
    try {
      setLoading(true)
      const res = await GetAllUserBlog()
      setBlogs(res.data?.blog)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  useMemo(() => {

    fatchBlogs()
    dispatch(unsetComment())

  }, [])

  const filteredBlogs = Blogs?.filter((blog) => {
    // ✅ If no category is selected or category is "All" → show all blogs
    if (!category || category === "All") return true;

    // ✅ Otherwise, match category slug
    return blog.category?.slug === category;
  });

  if (loading) return <div className="flex justify-center items-center h-[80vh] "><img src={loadingimg} alt="" /></div>

  return (

    <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
      {filteredBlogs?.length > 0 ? (
        filteredBlogs?.map((blog) => (

          <BlogCard key={blog._id} blog={blog} />
        ))) : (<h1>Blog not Found, Click Another Category</h1>)
      }
    </div>
  )
}

export default Home