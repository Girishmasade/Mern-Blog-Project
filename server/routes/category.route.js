import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.post("/add-category", addCategory);
categoryRoute.put("/update/:categoryid", updateCategory);
categoryRoute.get("/show/:categoryid", showCategory);
categoryRoute.delete("/delete/:categoryid", deleteCategory);
categoryRoute.get("/all-category", getAllCategory);

export default categoryRoute;
