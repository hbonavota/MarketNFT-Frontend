import { Redirect, Route } from "react-router";
import Cookies from 'js-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const usuario = Cookies.get('role')
  // const usuario = JSON.parse(window.sessionStorage.getItem('role'))
 
    let auth=null
   
    if (usuario==='admin'){
        auth=true
    }
      
  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/" />}</Route> 
  );
};

export default PrivateRoute;