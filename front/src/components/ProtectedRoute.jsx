import React from "react";
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks//useAuth';
import { useState, useEffect } from 'react';
import  Cookies  from "universal-cookie";


const ProtectedRoute = (Component) => {
    

    ////////
    const cookies = new Cookies();
    const token = cookies.get('tk')

    ////////
    
    
    //var { isAuthenticated, loading } = useAuth();
    var isAuthenticated1 = false
    if (token) {
        isAuthenticated1=true;
    }
    const actual = new Date()
    const tiempo = actual -new Date(cookies.get('loginDate'));
    console.log("Prot "+isAuthenticated1)
    console.log(new Date(cookies.get('loginDate')))
    console.log(actual)
    console.log(tiempo/60000)
    const tiempo2=tiempo/60000;
    if(tiempo2>1){
        isAuthenticated1=false;
    }
    //console.log(Component)
    //useEffect(() => { console.log("isauth3 : "+isAuthenticated1) }, [isAuthenticated1])
    
    return isAuthenticated1 ? <Component.element/> : <Navigate to="/login" />

    
    
}
export default ProtectedRoute