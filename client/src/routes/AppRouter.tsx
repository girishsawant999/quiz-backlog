import PrivateLayout from "@/components/PrivateLayout";
import { AuthProvider } from "@/Pages/Auth/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouteWrapper from "./helper/PrivateRouteWrapper";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }, index) => {
            return <Route key={index} path={path} element={element} />;
          })}

          {PRIVATE_ROUTES.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <PrivateLayout>
                  <PrivateRouteWrapper>{element}</PrivateRouteWrapper>
                </PrivateLayout>
              }
            />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
