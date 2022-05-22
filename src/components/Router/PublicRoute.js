import {useAuth} from "../AuthProvider";
import {Navigate} from "react-router";

export const PublicRoute = ({Component}) => {
    const {user} = useAuth();
    return user
        ? (<Navigate to="/restaurants"/>)
        : (<Component/>)
};
