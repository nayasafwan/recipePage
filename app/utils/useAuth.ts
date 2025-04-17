import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import api from "./api";


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState<String>()

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
          setUsername(response.data.data.user.username)
        } else {
          setIsAuthenticated(false);
          setUsername("Guest")
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUsername("Guest")
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { isAuthenticated, loading, username };
};

export default useAuth;
