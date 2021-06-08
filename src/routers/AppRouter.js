//sistema de rutas principal de la app. Usualmente se le llama así al principal
import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


//Todo el return lo saqué originalmente de la documentacion de react-router-dom
export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact 
                        path="/login" 
                        component={LoginScreen}
                        isAuthenticated={user.logged}
                    />
                    <PrivateRoute 
                        path="/" 
                        component={DashboardRoutes}
                        isAuthenticated={user.logged}
                    /> {/**Aqui le quité el exact, ya que no dejaría actuar a este otro manejador de rutas :$ */}
                </Switch>
            </div>
        </Router>
    )
}
