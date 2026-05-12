import { createContext, useState } from "react";
import axios from "axios";


export const UsersContext = createContext({
	isLogged: "",
    loginUser: async () => {},
    logoutUser: () => {},
    registerNewUser: async () => {},

})



export const UsersProvider = ({children}) => {
	
    const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("user")));
    
    const loginUser = async (values) => {
        const res = await axios.post("http://localhost:3000/auth/signin", values)
        if (!res.data.user) throw new Error("No se recibió el usuario");
    
        setIsLogged(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return(res.status)
    }

    const logoutUser = () => {
        localStorage.removeItem("user"); 
        setIsLogged(false);
    }

    const registerNewUser = async (values) => {
        const res = await axios.post("http://localhost:3000/auth/createUser", values);
        return (res.status);
    }


    const value = {
        isLogged,
        loginUser,
        logoutUser,
        registerNewUser,
    }

    return (	
        <UsersContext.Provider value = {value}>
            {children}
        </UsersContext.Provider>

    )

}