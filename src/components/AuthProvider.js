import * as React from "react";
import ApiRoutes from "../ApiRoutes";

let AuthContext = React.createContext(null);

export default function AuthProvider({children}) {
    let [user, setUser] = React.useState(null);

    let signIn = async (email, password) => {
        let response = await ApiRoutes.signIn(email, password);
        console.log(response);
        let token = response['Authorization'];
        if (!token) {
            console.log('LogIn failed.');
            return {error: true};
        }
        localStorage.setItem('token', token);
        response = await ApiRoutes.profile();
        console.log(response);
        setUser(response);
        return {};
    };

    let signOut = (callback) => {
        localStorage.removeItem('token');
        setUser(null);
        callback();
    };

    let value = {user, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
