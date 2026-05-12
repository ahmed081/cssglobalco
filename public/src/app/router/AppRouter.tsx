import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../../components/layout/AppLayout";
import HomePage from "../../features/home/HomePage";
import ServicesPage from "../../features/services/ServicesPage";
import PricingPage from "../../features/pricing/PricingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "pricing", element: <PricingPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
