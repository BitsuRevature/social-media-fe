import React, { useContext, useState} from "react";
import {AuthContextType} from "../util/types.ts";

// const AuthContext = React.createContext(undefined);
// const AuthUpdateContext = React.createContext(undefined);
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
const AuthUpdateContext = React.createContext<((data: AuthContextType) => void) | undefined>(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate(){
    return useContext(AuthUpdateContext);
}

export function AuthProvider({children}: {children: React.ReactNode}){
    let state: AuthContextType | undefined;
    let setState: (data: AuthContextType) => void;
    // eslint-disable-next-line prefer-const
    [state, setState] = useState();

    const func = (data: AuthContextType) => {
        setState(data);
    }

    return(
        <AuthContext.Provider value={state as AuthContextType}>
            <AuthUpdateContext.Provider value={func}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
