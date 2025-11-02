import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import slugify from 'slugify'
import { Addblog, AddCagetory, AllCagetory } from '@/api/baseUrl'
import { toast } from 'react-toastify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helper/RouteName'
import loadingimg from "@/assets/images/loading.svg"
import { useSelector } from 'react-redux'

const formSchema = z.object({
    title: z.string().min(5, "title must be at least 5 characters."),
    slug: z.string().min(5, "slug must be at least 5 characters."),
    category: z.string().min(5, "Category must be at least 5 characters."),
    blogcontent: z.string()
})

const AddBlog = () => {

    const [categorydata, setCategorydata] = useState([])
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    

    const fatchcategory = async () => {
        const cat = await AllCagetory()
        setCategorydata(cat?.data?.allCategory)
        console.log("this is category", cat.data.allCategory)
    }

    useEffect(() => {
        fatchcategory()
    }, [])


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            category: "",
            blogcontent: ""
        },
    })

    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue("blogcontent", data)

    }


    useEffect(() => {
        const category = form.watch("title")
        if (category) {
            const slug = slugify(category, { lower: true })
            form.setValue("slug", slug)
        }
    })

    async function onSubmit(values) {
        try {
            setLoading(true)
            const formData = new FormData();
            if (file) formData.append("blogimg", file);

            console.log(formData)
            // ✅ Append all other fields (fullname, email, bioData)
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // ✅ Send FormData to API
            const res = await Addblog(formData);

            console.log(res.data.message)
            setLoading(false)
            // toast.success(res?.data?.message);
            // dispatch(setUser(res?.data?.user));
            form.reset()
            navigate(RouteBlog);
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        // toast.success(res.data.message)
    }

    // ✅ File selection
    const handleFileSelection = (files) => {
        const file = files[0];
        setFile(file);
        console.log("one", file)

        setFilePreview(URL.createObjectURL(file));
        console.log("two", URL.createObjectURL(file))
    };

    if (loading) return <div className="flex justify-center items-center h-[80vh] "><img src={loadingimg} alt="" /></div>
    return (
        <div className=' '>
            <Card>
                <CardHeader>
                    <h2 className='text-2xl text-primary font-bold'>Add Blog</h2>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter blog title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter blog title" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter blog slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter blog slug" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Slug</FormLabel>
                                        <FormControl>
                                            {/* <Input placeholder="Enter Cagetory Slug" {...field} /> */}
                                            <Select onValueChange={field.onChange} defaultValues={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        categorydata.map((cat) => (

                                                            <SelectItem value={cat._id} key={cat._id}>
                                                                <span>{cat.category}</span>
                                                            </SelectItem>
                                                        ))
                                                    }

                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className="cursor-pointer">
                                        <FormLabel className={"mb-2"}>Enter Slug</FormLabel>
                                        <input {...getInputProps()} />
                                        <div className="flex justify-center items-center w-36 h-26  border-2 border-dashed rounded">
                                            <img src={filePreview} alt="" />
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                            <div className=''>

                                <FormField
                                    control={form.control}
                                    name="blogcontent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter blog slug</FormLabel>
                                            <FormControl>
                                                <Editor initialData="" onChange={handleEditorData} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <Button type="submit">Add Cateroty</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog