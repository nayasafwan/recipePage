import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import api from "./api";


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response: AxiosResponse = await api.post("/graphql", {
          query: `query {
                    user {
                        message,
                        code
                    }
                }`,
        });

        if (response.data.data.user.code === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
