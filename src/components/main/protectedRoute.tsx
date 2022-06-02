import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  role: string[];
};
export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const userRole = window.localStorage.getItem("role");

  if (userRole && role.includes(userRole)) {
    return children;
  }
  return <Navigate to={"/"} replace />;
}
