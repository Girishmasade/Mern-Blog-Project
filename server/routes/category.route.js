import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/category.controller.js";
import { adminAuthanticate } from "../middelware/adminAuthanticate.js";

const categoryRoute = Router();

categoryRoute.post("/add-category", adminAuthanticate, addCategory);
categoryRoute.put("/update/:categoryid", adminAuthanticate, updateCategory);
categoryRoute.get("/show/:categoryid", adminAuthanticate, showCategory);
categoryRoute.delete("/delete/:categoryid", adminAuthanticate, deleteCategory);
categoryRoute.get("/all-category", getAllCategory);

export default categoryRoute;
