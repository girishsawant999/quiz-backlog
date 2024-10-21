import PrivateLayout from "@/components/PrivateLayout";
import { AuthProvider } from "@/Pages/Auth/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouteWrapper from "./PrivateRouteWrapper";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
