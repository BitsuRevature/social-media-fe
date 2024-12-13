import {AuthProvider} from "./AuthContext.tsx";

export default function ContextProviders({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}