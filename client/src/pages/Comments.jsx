import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/use-fetch";
import { getEnv } from "@/utils/getEnv";
import Loading from "@/components/Loading";
import { FaTrashRestore } from "react-icons/fa";
import { deleteData } from "@/utils/handleDelete";
import { showToast } from "@/utils/showToast";


const Comments = () => {

  const [refreshData, setRefreshData] = useState(false)

  const {
    data,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = async(id) => {
      const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`)
      if (response) {
        setRefreshData(!refreshData)
        showToast('success', 'Data Deleted 🗑️')
      } else{
        showToast('error', 'Data not Deleted')
      }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <card>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?.blogid?.title}</TableCell>
                    <TableCell>{item?.user?.name}</TableCell>
                    <TableCell>{item?.comment}</TableCell>

                    <TableCell className='flex gap-3'>
                      <Button onClick={() => handleDelete(item._id)} variant="outline" className='hover:bg-violet-500 hover:text-white'>
                        <FaTrashRestore/>
                      </Button>

                    </TableCell>
                  
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Data Not Found ❌</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </card>
    </div>
  );
};

export default Comments;
