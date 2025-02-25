import { useFetch } from '@/hooks/use-fetch'
import { getEnv } from '@/utils/getEnv'
import React from 'react'
import { FaRegCommentDots } from "react-icons/fa6";

const CommentCount = ({props}) => {

    const {data, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials:'include'
    })
    // console.log(data);
    
  return (
    <div>
     <button type='button' className='flex justify-between items-center gap-1'>
     <FaRegCommentDots />
     {data && data.commentComments}
     </button>
    </div>
  )
}

export default CommentCount
