import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategorie, RouteEditCategorie } from '@/helper/RouteName'
import React, { useEffect, useMemo, useState } from 'react'
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
import { AllCagetory, DeleteCagetory } from '@/api/baseUrl'
import { Pencil, RotateCcw, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '@/redux/category.slice'


const CategoryDetail = () => {

    const navigate = useNavigate()
    const [categorydata, setCategorydata] = useState([])
    const dispatch = useDispatch()
    const {category} = useSelector(state => state.category)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.user.role !== "admin") {
            navigate(-1)
        }
    })

    const fatchcategory = async () => {
        const cat = await AllCagetory()
        setCategorydata(cat?.data?.allCategory)
        dispatch(setCategory(cat.data.allCategory))
    }

    useMemo(() => {
        fatchcategory()
        console.log(category)
    }, [])

    const handleDel = async (id) => {
        const res = await DeleteCagetory(id)
        toast.success(res.data.message)
        fatchcategory()
    }


    return (
        <div className=' '>
            <Card>
                <CardHeader>
                    <div className='flex justify-between'>
                        <Button asChild >
                            <Link to={RouteAddCategorie} >Add Category </Link>
                        </Button>

                    </div>
                </CardHeader>
                <CardContent>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Catogarys</TableHead>
                                <TableHead>Slugs</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {category?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.slug}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-1.5">
                                            <Button className={"bg-yellow-400 hover:bg-yellow-400"} asChild >
                                                <Link to={RouteEditCategorie(row._id)}>
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

export default CategoryDetail