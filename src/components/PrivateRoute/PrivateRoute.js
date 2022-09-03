import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({children}) => {
    const [loggedInUser , setLoggedInUser] = useContext(userContext);
    const location = useLocation()
    return loggedInUser.email ? children : <Navigate to="/login" replace state={{ path: location.pathname }}  />
};

export default PrivateRoute;