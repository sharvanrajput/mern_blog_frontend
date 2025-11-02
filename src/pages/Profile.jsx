import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Currentuser, UpdateProfile } from '@/api/baseUrl';
import { FaCamera } from "react-icons/fa";
import Dropzone from 'react-dropzone';
import { setUser } from '@/redux/user.slice'; // ✅ Added import

const formSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  bioData: z.string().optional(),
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [User, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // ✅ Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Currentuser();
        setUserData(res.data?.user);
      } catch (error) {
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      bioData: "",
    },
  });

  // ✅ Update form when user data is fetched
  useEffect(() => {
    if (User) {
      form.reset({
        fullname: User.fullname || "",
        email: User.email || "",
        bioData: User.bioData || "",
      });
    }
  }, [User]);

  // ✅ Handle form submit
  async function onSubmit(values) {
    try {
      const formData = new FormData();
      if (file) formData.append("profile", file);

      // ✅ Append all other fields (fullname, email, bioData)
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // ✅ Send FormData to API
      const res = await UpdateProfile(formData);

      toast.success(res?.data?.message);
      dispatch(setUser(res?.data?.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  // ✅ File selection
  const handleFileSelection = (files) => {
    const file = files[0];
    setFile(file);
    console.log("one",file)
    
    setFilePreview(URL.createObjectURL(file));
    console.log("two",URL.createObjectURL(file))
  };

  return (
    <div className='py-20 px-5'>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex justify-center items-center">
            <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <Avatar className="h-[100px] w-[100px] group relative">
                    <AvatarImage
                      src={filePreview || User.profile}
                      className="h-[100px] w-[100px] object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                    <div className="absolute inset-0 bg-black/30 hidden group-hover:flex justify-center items-center">
                      <FaCamera className="text-white text-2xl" />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Bio */}
              <FormField
                control={form.control}
                name="bioData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>bioData</FormLabel>
                    <FormControl>
                      <Textarea placeholder="I am a web developer..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
