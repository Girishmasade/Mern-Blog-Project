import {handleError} from '../helpers/handleError.js'
import Category from '../models/categories.model.js'

export const addCategory = async(req, res, next) => {
    try {
        const {name, slug} = req.body
        const category = new Category({
            name, slug
        })

        await category.save()

        res.status(200).json({
            success: true,
            message: 'Category added successFully 👍'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showCategory = async(req, res, next) => {
    try {
        const {categoryid} = req.params
        const category = await Category.findById(categoryid)
        if (!category) {condition
            next(handleError(404, 'Data Not Found ❌'))
        }
        res.status(200).json({ category }); 

    } catch (error) {
        next(handleError(500, error.message));
    } 
}

export const updateCategory = async(req, res, next) => {
     try {
        const {name, slug} = req.body
        const {categoryid} = req.params
        const category = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        }, {new: true})

        // await category.save()

        res.status(200).json({
            success: true,
            message: 'Category Updated successFully 👍',
            category
        })

    } catch (error) {
        next(handleError(500, error.message))
    }    
}   

export const deleteCategory = async(req, res, next) => {
     try {
        const {categoryid} = req.params
       await Category.findByIdAndDelete(categoryid)

        // await category.save()

        res.status(200).json({
            success: true,
            message: 'Category Deleted successFully 🗑️',
       })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllCategory = async(req, res, next) => {
    try {
        const category = await Category.find().sort({ createdAt: -1 }).lean().exec();
        res.status(200).json({ category }); 
    } catch (error) {
        next(handleError(500, error.message));
    }
    
}