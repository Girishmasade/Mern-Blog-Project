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
import { data, Link } from "react-router-dom";
import { getEnv } from "@/utils/getEnv";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/utils/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {

  const navigate = useNavigate()
  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(5, "name must be 5 character long"),
    password: z.string().min(8, "password must be 8 character long"),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "password and confirm password schould be same"
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(values)
        }
      );
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      navigate('/sign-in')
      showToast('success', data.message)
    } catch (error) {
      showToast('error', data.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create Account Here!
          </CardTitle>
       
        </CardHeader>
        <div className="">
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

            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Your Confirm Password"
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
                Sign Up
              </Button>
              <div className="flex justify-between mt-4">
                <p>Already have an account?</p>
                <Link to="/sign-in" className="text-blue-600 hover:underline">
                  SignIn
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
