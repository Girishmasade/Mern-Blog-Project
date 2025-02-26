import CommentCount from "@/components/CommentCount";
import Comments from "@/components/Comments";
import LikeCoount from "@/components/LikeCoount";
import Loading from "@/components/Loading";
import RelatedBlogs from "@/components/RelatedBlogs";
import { Avatar } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/use-fetch";
import { getEnv } from "@/utils/getEnv";
import { AvatarImage } from "@radix-ui/react-avatar";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

const SingleBlogDetails = () => {

  const { blog, category} = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },[blog, category]
  );

  if (loading) return <Loading />;

  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full py-2 px-3.5">
            <h1 className="font-bold text-2xl mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-gray-500">
                    {data.blog.author.name}
                  </span>
                  <p className="text-sm font-medium">
                    {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center gap-5">
                <LikeCoount props={{blogid: data.blog._id}}/>
                <CommentCount props={{blogid: data.blog._id}}/>
              </div>

            </div>

            <div className="my-5">
              <img
                src={data.blog.featuredImage}
                className="rounded shadow-md shadow-black/25"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.content) || "",
              }}
            ></div>

            <div className="border-t mt-5 pt-4">
              <Comments props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      )}

      <div className="border rounded md:w-[30%] w-full">
        <RelatedBlogs props={{ category: category, currentBlog: blog}}/>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
