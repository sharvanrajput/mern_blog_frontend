import { useEffect, useState } from "react";
import { Currentuser } from "@/api/baseUrl";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await Currentuser();

        if (!currentUser || !currentUser.success) {
          throw new Error(currentUser?.message || "Failed to fetch user");
        }

        setUser(currentUser.user);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, loading, error };
};

export default useFetchUser;
