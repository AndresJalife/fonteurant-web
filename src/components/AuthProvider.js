import * as React from "react";
import ApiRoutes from "../ApiRoutes";
import {useEffect} from "react";

let AuthContext = React.createContext(null);

export default function AuthProvider({children}) {
    let [user, setUser] = React.useState(null);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await ApiRoutes.profile();
            if (response.id)
                setUser(response);
            else
                signOut();
        }
    };

    const signIn = async (email, password) => {
        const response = await ApiRoutes.signIn(email, password);
        const token = response['Authorization'];
        if (!token) {
            console.log('LogIn failed.');
            return {error: true};
        }
        localStorage.setItem('token', token);
        await loadUser();
        return {};
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        loadUser();
    }, []);

    let value = {user, signIn, signOut, loadUser};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
