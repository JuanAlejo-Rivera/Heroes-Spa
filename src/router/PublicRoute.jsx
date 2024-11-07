import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../auth"


export const PublicRoute = ({ children }) => {

    const { logget } = useContext(AuthContext)
    return (!logget) 
    ? children 
    : <Navigate to="/marvel" />

}

