import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddBlog, RouteAddCategorie, RouteBlog, RouteEditBlog, RouteEditCategorie } from '@/helper/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react'
import { Allblog, Deleteblog, GetAllUserBlog } from '@/api/baseUrl'
import { toast } from 'react-toastify'
import { Pencil, Trash } from 'lucide-react'
import { useSelector } from 'react-redux'
const BlogDetails = () => {

    const [allblog, setAllblog] = useState()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
 



    const fetchallblog = async () => {
        if (user.user.role === "admin") {
            const res = await GetAllUserBlog()
            setAllblog(res.data.blog)
            console.log(res.data.blog)
        } else {
            const res = await Allblog()
            setAllblog(res.data.blog)
            console.log(res.data.blog)
        }

    }

    useEffect(() => {
        fetchallblog()
    }, [])

    const handleDel = async (id) => {
        try {
            const res = await Deleteblog(id)
            fetchallblog()
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className=' '>
            <Card>
                <CardHeader>
                    <div className='flex justify-between'>
                        <Button asChild >
                            <Link to={RouteAddBlog} >Add Blog </Link>
                        </Button>

                    </div>
                </CardHeader>
                <CardContent>

                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead >Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allblog?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.author.fullname}</TableCell>
                                    <TableCell>{row.category?.category}</TableCell>
                                    <TableCell>{row.title.slice(0, 20)}...</TableCell>
                                    <TableCell>{row.slug.slice(0, 20)}...</TableCell>
                                    <TableCell>{row.createdAt.split("T")[0]}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-1.5">
                                            <Button className={"bg-yellow-400 hover:bg-yellow-400"} asChild >
                                                <Link to={RouteEditBlog(row._id)}>
                                                    <Pencil />
                                                </Link>
                                            </Button>
                                            <Button variant={"destructive"} onClick={() => handleDel(row._id)}>
                                                <Trash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div >
    )
}

export default BlogDetails