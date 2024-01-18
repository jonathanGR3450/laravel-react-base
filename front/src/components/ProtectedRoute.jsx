import React from "react";
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks//useAuth';
import { useState, useEffect } from 'react';
import  Cookies  from "universal-cookie";
import { useLocation } from 'react-router-dom';


const ProtectedRoute = (Component) => {
    

    ////////
    const cookies = new Cookies();
    const token = cookies.get('tk')
    const location = useLocation();
    const ruta = location.pathname;
    //console.log(location.pathname);

    ////////
    
    
    //var { isAuthenticated, loading } = useAuth();
    var isAuthenticated1 = false
    if (token) {
        isAuthenticated1=true;
    }
    const actual = new Date()
    const tiempo = actual -new Date(cookies.get('loginDate'));
    const rol = cookies.get('rol');
    console.log("El rol es: ", rol);
    console.log("Prot "+isAuthenticated1)
    console.log(new Date(cookies.get('loginDate')))
    console.log(actual)
    console.log(tiempo/60000)
    const tiempo2=tiempo/60000;
    if(tiempo2>1){
        isAuthenticated1=false;
    }
    if(rol!="Admin"  && rol!="Tramitador" && rol!="Coordinador" && rol!="Juridico" ){//
        isAuthenticated1=false;
        alert("Rol incorrecto");        
    }
    if(rol=="Admin"){
        if(ruta!="/Incremento" && ruta !="/Tablero" && ruta !="/Consulta" && ruta !="/Ficha" && ruta !="/Uniconst" && ruta !="/Resumen" && ruta !="/NumPredial" && ruta !="/LoadData" && ruta !="/LoadConstruccion" && ruta !="/DataHom" && ruta !="/Avaluo" && ruta !="/Login" && ruta !="/Registrar" && ruta !="/Resolucion" && ruta !="/Resoluciones" ){//
        isAuthenticated1=false;
        alert("Acceso restringido para el rol");
        }
    }

    //console.log(Component)
    //useEffect(() => { console.log("isauth3 : "+isAuthenticated1) }, [isAuthenticated1])
    
    return isAuthenticated1 ? <Component.element/> : <Navigate to="/login" />

    
    
}
export default ProtectedRoute