import Layout from "@/Layout/Layout";
import AddBlog from "@/pages/Blog/AddBlog";
import BlogDetails from "@/pages/Blog/BlogDetails";
import EditBlog from "@/pages/Blog/EditBlog";
import AddCaegory from "@/pages/Category/AddCaegory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import SingleBlogDetails from "@/pages/Category/SingleBlogDetails";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { RouteBlogDetails, RouteEditBlog, RouteEditCategory } from "@/utils/router";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          {/* Category */}
          <Route path="/add-category" element={<AddCaegory />} />
          <Route path="/category-details" element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* Blog Category */}
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path={RouteEditBlog()} element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Router;
