import { Route, Routes } from "react-router-dom"
import { HeroesRoutes } from "../heroes";
import { LoginPage } from '../auth';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/login/*" element={
          // Ruta publica si esta logeado
          <PublicRoute>
            {/* <LoginPage /> */}
            <Routes>
              <Route path="/*" element={<LoginPage />} />
            </Routes>
          </PublicRoute>
        } />
        {/* <Route path="login" element={<LoginPage />} /> */}


        <Route path="/*" element={
          // Ruta privada si esta logeado
          <PrivateRoute>
            <HeroesRoutes />
          </PrivateRoute>
        } />

      </Routes>
    </>
  )
}