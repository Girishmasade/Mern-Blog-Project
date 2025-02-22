export const RouteEditCategory = (category_id) => {
    if (category_id) {
        return `/category/edit/${category_id}`
    } else {
        return `/category/edit/:category_id`
    }
}

export const RouteEditBlog = (Blog_id) => {
    if (Blog_id) {
        return `/blog/edit/${Blog_id}`
    } else {
        return `/blog/edit/:Blog_id`
    }
}