import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useSelector } from "react-redux";

const CommentList = ({ onDelete }) => {
  const { comments } = useSelector((state) => state.comment);

  return (
    <div>
      {comments?.map((comment) => {
        let [date, time] = comment?.createdAt?.split("T") || ["", ""];
        let [hours, minutes] = time?.split(":") || [];

        return (
          <div
            key={comment._id}
            className="flex justify-between items-start mb-4 border-b pb-2"
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment?.userid?.profile} />
                <AvatarFallback>
                  {comment?.userid?.fullname?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{comment?.userid?.fullname}</p>
                <p className="text-xs text-foreground">
                  {`${date} ${hours}:${minutes}`}
                </p>
                <p className="mt-1 text-sm text-foreground">{comment.comment}</p>
              </div>
            </div>

            <Button
              size="icon"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => onDelete(comment._id)}
            >
              <Trash size={16} />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
