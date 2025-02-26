import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { showToast } from "@/utils/showToast";
import { getEnv } from "@/utils/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/use-fetch";
import Loading from "@/components/Loading";
import userIcon from "@/assets/images/user.png";
import { IoCameraReverseOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";

const Profile = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const user = useSelector((state) => state.user);
  // console.log(user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/profile/${user.user._id}`, {
    method: "get",
    credentials: "include",
  });
  // console.log(userData);

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(5, "name at least 5 character"),
    email: z.string().email(),
    bio: z.string().min(5, "min  character"),
    // password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user?.name,
        email: userData.user?.email,
        bio: userData.user?.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));

      showToast("success", data.message);
    } catch (error) {
      showToast("error", data.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  if (loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || userIcon
                    }
                  />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-blue-500 rounded-full group-hover:flex hidden cursor-pointer">
                    <IoCameraReverseOutline
                      color="#00000"
                      className="w-10 h-10"
                    />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="name"
                          placeholder="Enter Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          type="bio"
                          placeholder="Enter your Bio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <Button type="submit" className="w-full">
                  Update Details
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
