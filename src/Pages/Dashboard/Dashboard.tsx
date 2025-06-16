import React, { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthRedirect } from "../../Hooks/UseAuthRedirect";

export default function Dashboard() {
  useAuthRedirect();

  useEffect(() => {
    axiosInstance
      .get("/some-protected-endpoint")
      .then((res) => {
        // handle data
      })
      .catch((err) => {
        // error is handled globally (redirects on 401)
      });
  }, []);

  return <div>Dashboard Content</div>;
}