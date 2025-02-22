import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
const BlogDetails = () => {
  return (
    <div>
    <card>
      <CardHeader>
        <CardTitle>
          <Button>
            <Link to="/add-blog">Add Blogs</Link>
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
            {/* {categoryData && categoryData.category.length > 0 ? (
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
            )} */}
          </TableBody>
        </Table>
      </CardContent>
    </card>
  </div>
  )
}

export default BlogDetails
