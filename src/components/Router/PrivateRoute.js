import {useAuth} from "../AuthProvider";
import {Navigate} from "react-router";

export const PrivateRoute = ({Component}) => {
    const {user} = useAuth();
    return user
        ? (<Component/>)
        : (<Navigate to="/"/>)
};
