import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { useFetch } from '@/hooks/use-fetch'
import { getEnv } from '@/utils/getEnv'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchBlog = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    console.log(q);

    const { data:blogData, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      console.log(blogData);

      if(loading) return <Loading/>
    
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {
          blogData && blogData.blog.length > 0 
          ?
          blogData.blog.map(blog => <BlogCard key={blog._id} props={blog}/>)
          :
          <div>Data Not Found</div>
        }
      </div>
    
  )
}

export default SearchBlog
