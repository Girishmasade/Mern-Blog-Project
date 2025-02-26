import AuthRouteAdminAllowed from "@/components/AuthRouteAdminAllowed";
import AuthRouteProtechtion from "@/components/AuthRouteProtection";
import Layout from "@/Layout/Layout";
import AddBlog from "@/pages/Blog/AddBlog";
import BlogByCategory from "@/pages/Blog/BlogByCategory";
import BlogDetails from "@/pages/Blog/BlogDetails";
import EditBlog from "@/pages/Blog/EditBlog";
import AddCaegory from "@/pages/Category/AddCaegory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import SingleBlogDetails from "@/pages/Category/SingleBlogDetails";
import Comments from "@/pages/Comments";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import SearchBlog from "@/pages/SearchBlog";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import User from "@/pages/User";
import {
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteSearch,
} from "@/utils/router";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Blog Category */}
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchBlog />} />
        </Route>

        {/* Authantication */}
        <Route element={<AuthRouteProtechtion />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path={RouteEditBlog()} element={<EditBlog />} />
        </Route>

        {/* Admin auth */}
        <Route element={<AuthRouteAdminAllowed />}>

          {/* Category */}
          <Route path="/add-category" element={<AddCaegory />} />
          <Route path="/category-details" element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Router;
