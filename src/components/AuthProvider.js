import * as React from "react";
import ApiRoutes from "../ApiRoutes";
import {useEffect} from "react";

let AuthContext = React.createContext(null);

export default function AuthProvider({children}) {
    let [user, setUser] = React.useState(null);

    let loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await ApiRoutes.profile();
            setUser(response);
        }
    };

    let signIn = async (email, password) => {
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

    let signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        loadUser();
    }, []);

    let value = {user, signIn, signOut};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
