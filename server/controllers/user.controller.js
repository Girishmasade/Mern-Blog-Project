import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary  from '../config/cloudinary.js';

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid }).lean().exec();
    if (!user) {
      next(handleError(404, "User not found."));
    }
    res.status(200).json({
      success: true,
      message: "User data found.",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;

    const user = await User.findById(userid);

    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password > length >= 0) {
      const hashedPassword = bcryptjs.hashSync(data.password);
      user.password = hashedPassword;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader
      .upload(
          req.file.path, {
            folder: 'mern-blog-project',
              resource_type: 'auto'
          }
      )
      .catch((error) => {
        next(handleError(500, error.message))
      });
   
      user.avatar = uploadResult.secure_url
     
    }

    await user.save()

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "User data Updated.",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const getAllUser = async(req, res, next) => {
  try {
    const user = await User.find().sort({CreatedAt: -1})
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export const deleteUser = async(req, res, next) => {
  try {
    const {id} = req.params
  await User.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'User Deleted'
    })
  } catch (error) {
    next(handleError(500, error.message));
  }
}