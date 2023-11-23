import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { baseApi } from "../baseAPI";
import jwt_decode from "jwt-decode";

export const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const userToken = localStorage.getItem("token");

        const decoded = jwt_decode<{
          exp: number;
          userId: string;
          status: "blocked" | "active";
        }>(userToken || "");

        const currentUser = await baseApi.get("user/fetch-user", {
          headers: {
            Authorization: userToken,
          },
        });
        if (currentUser.data.role !== "admin") {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
      }
    };
    checkRole();

    return;
  }, [navigate]);

  return <Outlet />;
};
