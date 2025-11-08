import { Login } from '@/api/baseUrl'
import GoogleLogin from '@/components/GoogleLogin'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RouteSignin, Routesignup } from '@/helper/RouteName'
import { setUser } from '@/redux/user.slice'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import z from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 charactor logn")
})

const Signin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user && user?.isLoggedIn) {
            navigate("/")
        } else {
            navigate(RouteSignin)
        }
        console.log("user state", user?.isLoggedIn)
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values) {
        try {
            const res = await Login(values)
            toast.success(res.data.message)
            dispatch(setUser(res?.data?.user))

            navigate("/")
            console.log("loigin res ", res)

        } catch (error) {
            toast.error(error.response?.data?.message)
        }

    }
    return (
        <div className=' flex justify-center items-center h-screen' >
            <Card className={"w-[400px] p-5"}>
                <CardHeader>

                    <CardTitle className={"text-2xl font-bold text-center "}>Login Into Account </CardTitle>
                    <CardDescription className={"text-md font-bold text-center mb-2"}>Welcome back user </CardDescription>
                    <div>
                        <GoogleLogin />
                        <div className="flex justify-center items-center my-5 border-2">
                            <span className='absolute bg-white px-3'>or</span>
                        </div>

                    </div>
                </CardHeader>

                <CardContent >

                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter you email" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mb-5">
                                <Button type="submit" className={"w-full"}>Sign in</Button>
                                <div className='text-center mt-3'>
                                    <p>Don't have Account <Link className='text-blue-500 hover:underline' to={Routesignup}> Sign up </Link></p>
                                </div>
                            </div>
                        </form>
                    </Form >
                </CardContent>

            </Card>


        </div >
    )
}

export default Signin