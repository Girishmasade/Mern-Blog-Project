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
import { RiEdit2Line } from "react-icons/ri";
import { RouteEditCategory } from "@/utils/router";
import { deleteData } from "@/utils/handleDelete";
import { showToast } from "@/utils/showToast";


const CategoryDetails = () => {

  const [refreshData, setRefreshData] = useState(false)

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = (id) => {
      const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`)
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
        <CardHeader>
          <CardTitle>
            <Button>
              <Link to="/add-category">Add Category</Link>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.slug}</TableCell>
                    
                    <TableCell className='flex gap-3'>

                      <Button asChild variant="outline" className='hover:bg-violet-500 hover:text-white'>
                        <Link to={RouteEditCategory(item._id)}>
                        <RiEdit2Line/>
                        </Link>
                      </Button>

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

export default CategoryDetails;
