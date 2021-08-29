import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();



export default function ProtectedRouteAdmin({ component: Component, ...restOfProps }) {
  const isSigned = (cookies.get('isSigned') === 'true');
  console.log(isSigned);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isSigned? <Component {...props} /> : <Redirect to="/AdminLogin" />
      }
    />
  );
}
