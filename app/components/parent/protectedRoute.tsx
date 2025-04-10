import { setAuthModal } from "@/app/redux/recipeSlider";
import useAuth from "@/app/utils/useAuth";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, loading }: { isAuthenticated: boolean, loading : boolean } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated) {
                dispatch(setAuthModal(false));
            } else {
                dispatch(setAuthModal(true));
                router.push("/recipe");
            }
        }
    }, [isAuthenticated, loading, dispatch, router]);

    
    if (loading) return <div>Loading...</div>; // Or a spinner
    if (isAuthenticated) return <>{children}</>;

}

export default ProtectedRoute;