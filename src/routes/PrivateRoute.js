// import { useSelector } from "react-redux";
// import { Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ ...rest }) => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     if (isAuthenticated) return <Route {...rest} />;
//     delete rest.component;
//     return <Route {...rest} render={(props) => <Navigate to="/login" />} />;
//   };

// export default PrivateRoute;
