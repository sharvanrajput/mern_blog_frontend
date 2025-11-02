import React, { useEffect } from 'react'
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
import { AddCagetory } from '@/api/baseUrl'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AddCategory = () => {

    const formSchema = z.object({
        category: z.string().min(5, {
            message: "title must be at least 5 characters.",
        }),
        slug: z.string().min(5, {
            message: "slug must be at least 5 characters.",
        }),
    })

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (user.user.role !== "admin") {
            navigate(-1)
        }
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            slug: "",
        },
    })


    useEffect(() => {
        const category = form.watch("category")
        if (category) {
            const slug = slugify(category, { lower: true })
            form.setValue("slug", slug)
        }
    })

    async function onSubmit(values) {
        const res = await AddCagetory(values)
        form.reset()
        toast.success(res.data.message)
    }

    return (
        <div className=' '>
            <Card>
                <CardHeader>
                    <h2 className='text-2xl text-primary font-bold'>Add Category</h2>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Category category" {...field} />
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
                                        <FormLabel>Enter Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Cagetory Slug" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Add Cateroty</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCategory