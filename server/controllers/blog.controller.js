import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

    let featuredImage = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mern-blog-project",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      title: data.title,
      category: data.category,
      slug: data.slug,
      featuredImage: featuredImage,
      content: encode(data.content),
    });

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog Added successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate("category", "name");

    if (!blog) {
      next(handleError(404, "Data not found."));
    }

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.content = encode(data.content);

    let featuredImage = blog.featuredImage;

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mern-blog-project",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    blog.featuredImage = featuredImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Succesfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
    try {
      const {slug} = req.params;
      const blog = await Blog.findOne({slug})
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .lean()
        .exec();
      res.status(200).json({
        blog,
      });
    } catch (error) {
      next(handleError(500, error.message));
    }
  };