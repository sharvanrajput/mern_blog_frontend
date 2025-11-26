import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    // baseURL: "https://api-blogs-backend.onrender.com/api",
    baseURL: "https://api-blogs-backend.onrender.com/api",
    withCredentials: true,
});

// 🔥 Attach Token Automatically on Every Request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const Register = async (data) => {
    return await api.post("/auth/register", data);
};
export const Login = async (data) => {
    return await api.post("/auth/login", data);
};
export const googleLogin = async (data) => {
    return await api.post("/auth/googlelogin", data);
};
export const Logout = async () => {
    return await api.post("/auth/logout");
};
export const Currentuser = async () => {
    return await api.get("/auth/currentuser");
};
export const UpdateProfile = async (data) => {
    return await api.patch("/auth/updateprofile", data);
};



// categoryes apis

export const AddCagetory = async (data) => {
    return await api.post("/catetory/add", data);
};

export const AllCagetory = async () => {
    return await api.get("/category/all");
};

export const OneCagetory = async (data) => {
    return await api.get(`/catetory/one/${data}`);
};

export const UpdateCagetory = async (id, values) => {
    return await api.patch(`/catetory/update/${id}`, values);
};

export const DeleteCagetory = async (data) => {

    return await api.delete(`/catetory/delete/${data}`);
};


// blog apis


export const Addblog = async (data) => {
    return await api.post("/blog/add", data);
};

export const Allblog = async () => {
    return await api.get("/blog/getblog");
};
export const GetAllUserBlog = async () => {
    return await api.get("/blog/getalluserblog");
};

export const GetRelatedBlog = async (category, slug) => {
    return await api.get(`/blog/getoneblog/${category}/${slug}`);
};

export const Oneblog = async (id) => {
    return await api.get(`/blog/getoneblog/${id}`);
};

export const BlogBySlug = async (data) => {
    return await api.post(`/blog/blogbyslug/${data}`);
};

export const Updateblog = async (id, data) => {
    return await api.patch(`/blog/updateblog/${id}`, data);
};

export const Deleteblog = async (id) => {
    return await api.delete(`/blog/delete/${id}`);
};


// Comments apis

export const AddComment = async (blogid, comment) => {
    return await api.post("/comments/add", { blogid, comment })
}
export const AllComment = async (blogid) => {
    return await api.get(`/comments/all/${blogid}`,)
}
export const OneComment = async (id) => {
    return await api.get(`/comments/one/${id}`)
}
export const UpdateComment = async (id, data) => {
    return await api.patch(`/comments/update/${id}`, data)
}
export const deleteComment = async (id) => {
    return await api.delete(`/comments/delone/${id}`)
}

// like apis 

export const TogggleLikeOnBlog = async (blogid) => {
    return await api.post(`/likes/togglelike/${blogid}`)
}
export const GetAllLikeOnBlog = async (blogid) => {
    return await api.post(`/likes/likeonblog/${blogid}`)
}
export const UserLikeOnBlog = async () => {
    return await api.post(`/likes/userlikeatblog`)
}
