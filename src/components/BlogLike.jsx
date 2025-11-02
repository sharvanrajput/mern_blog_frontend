import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { Button } from "./ui/button";
import { GetAllLikeOnBlog, TogggleLikeOnBlog, UserLikeOnBlog } from "@/api/baseUrl";
import { toast } from "react-toastify";

const BlogLike = ({ blogid }) => {
  const [likedata, setLikedata] = useState("");
  const [likes, setBloglikes] = useState(0);
  const [userlikes, setUserLikes] = useState([]);

  // 🧠 Fetch all likes for this blog
  const fetchLikeByBlogId = async () => {
    try {
      const res = await GetAllLikeOnBlog(blogid);
      // const res = await GetAllLikeOnBlog(blogid);
      setBloglikes(res?.data?.likecount || 0);
      console.log(res?.data?.likecount)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch likes");
    }
  };

  // 🧠 Fetch which blogs this user has liked
  const checkUserLike = async () => {
    try {
      const res = await UserLikeOnBlog();
      setUserLikes(res?.data?.userlikes || []);
    } catch (error) {
      console.error("Error checking user likes:", error);
    }
  };

  // ❤️ Toggle like/unlike
  const likeOrDislike = async () => {
    try {
      const res = await TogggleLikeOnBlog(blogid);
      setLikedata(res?.data?.message);
      toast.success(res?.data?.message);
      await fetchLikeByBlogId();
      await checkUserLike();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to toggle like");
    }
  };

  // 🕒 Fetch likes after 500ms debounce when likedata changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLikeByBlogId();
      checkUserLike();
    }, 500);

    return () => clearTimeout(timer);
  }, [likedata, blogid]);

  // ✅ Check if the current blog is liked by the user
  const isLikedByUser = userlikes.some((like) => like.blogid === blogid);

  return (
    <div className="">
      <Button
        className="cursor-pointer bg-transparent hover:bg-transparent me-2 p-0"
        onClick={likeOrDislike}
      >
        <div className="flex items-center gap-1">
          {isLikedByUser ? (
            <FcLike size={22} />
          ) : (
            <FaRegHeart size={22} className="text-foreground" />
          )}
          <h2 className="text-md text-foreground">{likes}</h2>
        </div>
      </Button>
    </div>
  );
};

export default BlogLike;
