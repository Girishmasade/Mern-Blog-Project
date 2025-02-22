import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/utils/showToast";
import { getEnv } from "@/utils/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/use-fetch";
import Dropzone from "react-dropzone";
import { GoPlus } from "react-icons/go";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const formSchema = z.object({
    category: z.string().min(3, "category must be at least 3 character long."),
    title: z.string().min(3, "title must be at least 3 character long."),
    slug: z.string().min(3, "Slug must be at least 3 character long."),
    content: z.string().min(3, "content must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      content: "",
    },
  });

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

    async function onSubmit(values) {
      try {
        const newValues = {...values, author: user.user._id}
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(newValues));
  
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/add-blog`,
          {
            method: "post",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          return showToast("error", data.message);
        }
        // dispatch(setUser(data.user));
        form.reset()
        setFile()
        setFilePreview()
        navigate('/blog-details')
        showToast("success", data.message);
      } catch (error) {
        showToast("error", data.message);
      }
    }
  // onSubmit={form.handleSubmit(onSubmit)}

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const handleEditorData = (event, editor) => {
    const data = editor.getData()
    form.setValue('content', data)
    setFile(file)
    console.log(data);
  }

  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>

                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {blogData &&
                              blogData.category.length > 0 &&
                              blogData.category.map((item) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Blog Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <span className="mb-2 block">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-36 border border-dashed rounded">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
              <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                      <Editor props={{ initialData: '', onChange: handleEditorData }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
