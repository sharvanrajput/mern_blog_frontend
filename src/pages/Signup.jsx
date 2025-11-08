import { Register } from '@/api/baseUrl';
import GoogleLogin from '@/components/GoogleLogin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RouteSignin, Routesignup } from '@/helper/RouteName';
import { setUser } from '@/redux/user.slice';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';

// Zod schema
const formSchema = z
  .object({
    fullname: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  useEffect(() => {
    if (user && user?.isLoggedIn) {
      navigate("/")
    } else {
      navigate(Routesignup)
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    // Only send fields required by backend
    const { fullname, email, password } = values;
    const payload = { fullname, email, password };
    console.log(payload)

    try {
      const res = await Register(payload);
      console.log("Register response:", res);
      toast.success(res?.data?.message)
      dispatch(setUser(res?.data?.user))
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] p-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
          <CardDescription className="text-md font-bold text-center mb-2">Have a good day</CardDescription>
          <div>

            <GoogleLogin />

            <div className="flex justify-center items-center my-5 border-2">
              <span className='absolute bg-white px-3'>or</span>
            </div>

          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-5">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <Link className="text-blue-500 hover:underline" to={RouteSignin}>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
