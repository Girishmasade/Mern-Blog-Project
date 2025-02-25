import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/utils/showToast";
import { getEnv } from "@/utils/getEnv";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";

const Comments = ({ props }) => {
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z.string().min(3, "Name must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        user: user.user._id,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/add-comment`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      setNewComment(data.comment);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        <FaComments className="text-blue-500" />
        Comment
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Type  Your Comment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        <Button>
          <Link>Sign In</Link>
        </Button>
      )}

      <div className="border-t mt-5 pt-4">
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>
    </div>
  );
};

export default Comments;
