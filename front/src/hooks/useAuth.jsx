import { useState, useEffect } from 'react';
import  Cookies  from "universal-cookie";


const useAuth = () => {
   var [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(false);

  useEffect(() => {
      const cookies = new Cookies();
      const token = cookies.get('tk')
      console.log("El auth token: "+token)
      console.log(token)
      
      //const token = localStorage.getItem('token');
      if (token) {
         setIsAuthenticated(true);
         while(isAuthenticated==false)
         {
            const a =1
            isAuthenticated=true;
            
         }
         console.log("El auth auth: "+isAuthenticated)
         //isAuthenticated=true;
         //console.log("El auth auth: "+isAuthenticated)
      }
  }, []);
  useEffect(() => { console.log("isauth : "+isAuthenticated) }, [isAuthenticated])

  return { isAuthenticated, setIsAuthenticated, loading, setLoading };
};

export default useAuth;