import { Redirect, Route } from "react-router";


const PrivateRoute = ({ component: Component, ...rest }) => {
   
  const usuario = JSON.parse(window.sessionStorage.getItem('role'))
 
    let auth=null
   
    if (usuario==='admin'){
        auth=true
    }
      
  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/" />}</Route> 
  );
};

export default PrivateRoute;