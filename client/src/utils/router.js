export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/category/edit/${category_id}`;
  } else {
    return `/category/edit/:category_id`;
  }
};

export const RouteEditBlog = (blogid) => {
  if (blogid) {
    return `/blog/edit/${blogid}`;
  } else {
    return `/blog/edit/:blogid`;
  }
};

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return "/blog/:category/:blog";
  } else {
    return `/blog/${category}/${blog}`;
  }
};

export const RouteBlogByCategory = (category) => {
  if (!category) {
    return "/blog/:category";
  } else {
    return `/blog/${category}`;
  }
};

export const RouteSearch = (q) => {
    if (q) {
      return `/search?q=${q}`;
    } else {
      return `/search`
    }
};
