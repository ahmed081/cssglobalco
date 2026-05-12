import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "../ui/CustomCursor";

export function AppLayout() {
  return (
    <>
      <CustomCursor />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
