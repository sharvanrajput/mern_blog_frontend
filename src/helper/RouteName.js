import { refine } from "zod"

export const RouteIndex = "/"
export const RouteSignin = "/sign-in"
export const Routesignup = "/sign-up"
export const RouteProfile = "/profile"
export const RouteCategorie = "/categories"
export const RouteAddCategorie = "/categories/add"
export const RouteEditCategorie = (id) => {
    if (id) {
        return `/categories/edit/${id}`
    } else {
        return `/categories/edit/:id`
    }
}


export const RouteBlog = "/blog"
export const RouteAddBlog = "/blog/add"
export const RouteEditBlog = (id) => {
    if (id) {
        return `/blog/edit/${id}`
    } else {
        return `/blog/edit/:id`
    }
}

export const RouteBlogDetails = (category, blog) => {
    if (!category || !blog ) {
        return "/blog/:category/:blog"
    } else {
        return `/blog/${category}/${blog}`
    }
}