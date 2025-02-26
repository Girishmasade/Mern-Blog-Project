import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { getEnv } from "@/utils/getEnv";
import { deleteData } from "@/utils/handleDelete";
import Loading from "@/components/Loading";
import { RiEdit2Line } from "react-icons/ri";
import { FaTrashRestore } from "react-icons/fa";
import { showToast } from "@/utils/showToast"; 
import moment from "moment";
import { useFetch } from "@/hooks/use-fetch";
import { RouteEditBlog } from "@/utils/router";

const BlogDetails = () => {

  const [refreshData, setRefreshData] = useState(false)

  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = (id) => {
      const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/blog/delete-blog/${id}`)
      if (response) {
        setRefreshData(!refreshData)
        showToast('success', 'Data Deleted 🗑️')
      } else{
        showToast('error', 'Data not Deleted')
      }
  }

  // console.log(blogData);
  

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Button>
              <Link to="/add-blog">Add Blog</Link>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.author?.name || "Unknown"}</TableCell>
                    <TableCell>{blog.category?.name || "Uncategorized"}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button asChild variant="outline" className="hover:bg-violet-500 hover:text-white">
                        
                        <Link to={RouteEditBlog(blog._id)}>
                          <RiEdit2Line />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <FaTrashRestore />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6">No Blogs Found ❌</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
