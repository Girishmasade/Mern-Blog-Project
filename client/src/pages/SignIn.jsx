import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { showToast } from "@/utils/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/utils/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be 8 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          credentials: "include",
          body: JSON.stringify(values)
        }
      );
      const data = await response.json()
      if (!response.ok) {
       return showToast('error', data.message)
      }
      dispatch(setUser(data.user))
      navigate('/')
      showToast('success', data.message)
    } catch (error) {
      showToast('error', data.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
       <div className="flex items-center justify-center text-2xl">
       <Link to='/'>
        <FaArrowAltCircleLeft />
        </Link>
       </div>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login Here!</CardTitle>
        </CardHeader>

        <div>
          <GoogleLogin/>
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white tex-sm">Or</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="Enter Your Email" {...field} />
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
                      <Input type='password' placeholder="Enter Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <div className="flex justify-between mt-4">
                <p>Don&apos;t have account?</p>
                <Link to="/sign-up" className="text-blue-600 hover:underline">
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
