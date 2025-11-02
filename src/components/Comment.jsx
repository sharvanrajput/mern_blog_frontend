import { FaRegComments } from "react-icons/fa";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";
import {
    AddComment,
    AllComment,
    deleteComment,
} from "@/api/baseUrl";
import { useDispatch } from "react-redux";
import { setComments } from "@/redux/coments.slice";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { Save, Send } from "lucide-react";

const formSchema = z.object({
    comment: z
        .string()
        .min(2, "Comment must be at least 2 characters")
        .max(200, "Comment must be under 200 characters"),
});

const Comment = ({ blogid }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { comment: "" },
    });

    // ✅ Fetch all comments
    const fetchComments = async () => {
        try {
            const res = await AllComment(blogid);
            const fetched = res?.data?.comments || [];
            dispatch(setComments(fetched));
        } catch (error) {
            // toast.error(error?.response?.data?.message || "Failed to fetch comments");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogid, count]);

    // ✅ Delete comment
    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            toast.success("Comment deleted");
            fetchComments();
            setCount(count + 1)
        } catch (error) {
            toast.error("Failed to delete comment");
        }
    };

    // ✅ Add comment
    const onSubmit = async (values) => {
        try {
            await AddComment(blogid, values.comment);
            toast.success("Comment added");
            form.reset();
            fetchComments();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add comment");
        }
    };

    return (
        <div className="relative">
            <h2 className="flex items-center gap-2 text-2xl mb-3 font-bold">
                <FaRegComments className="text-primary" /> Comments
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Enter comment..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-full absolute top-2 right-2"
                        title="Add Comment"
                    >
                        <Send />
                    </Button>
                </form>
            </Form>

            <div className="border-t mt-5 pt-6">
                <CommentList onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Comment;
