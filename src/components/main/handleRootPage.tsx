import { Navigate } from "react-router-dom";

/* type HandleRootPageProps = {
  children: JSX.Element;
  role: string[];
}; */
export function HandleRootPage() {
  const userRole = window.localStorage.getItem("role");
  if (!userRole) return <Navigate to={"/login"} replace />;
  switch (userRole) {
    case "Waiter":
      return <Navigate to={"/camarero"} replace />;
    case "Manager":
      return <Navigate to={"/manager"} replace />;
    case "Owner":
      return <Navigate to={"/boss"} replace />;
    default:
      return <Navigate to={"/login"} replace />;
  }
}
