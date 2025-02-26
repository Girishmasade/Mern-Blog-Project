import { useFetch } from '@/hooks/use-fetch';
import { getEnv } from '@/utils/getEnv';
import React from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/utils/router';

const RelatedBlogs = ({props}) => {
      const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      // console.log(data);

      if(loading) return <Loading/>
      
  return (
    <div>
      <h1 className='text-center text-gray-500 font-semibold text-xl py-4'>Related Blogs</h1>
    
    <div className="px-4">
      {
        data && data.relatedBlog.length > 0 
        ? 
      data.relatedBlog.map(blog => {
        return (
          <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
          <div className="flex items-center gap-2 mb-3">
          <img src={blog.featuredImage} alt="" className='w-32 object-cover rounded-md'/>
          <h4 className='line-clamp-2 text-lg font-semibold'>{blog.title}</h4>
      </div>
      </Link>
        )
      })
    :
    <div>No related Blog</div>
      }
       
    </div>
    </div>
  )
}

export default RelatedBlogs
