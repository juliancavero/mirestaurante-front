import { useEffect, useState } from "react";

export function LogInOutButton() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const u = window.localStorage.getItem("userName");
    if (u) {
      setIsLogged(true);
      setUserName(u);
    }
  }, []);

  return (
    <>
      <NotLoggedIn isLogged={isLogged} />
      <Loggedin isLogged={isLogged} userName={userName} />
    </>
  );
}
type NotLoggedInProps = {
  isLogged: boolean;
};
function NotLoggedIn({ isLogged }: NotLoggedInProps) {
  if (isLogged) return null;
  function handleLogIn() {
    window.location.assign("/login");
  }
  return (
    <button className="btn" onClick={handleLogIn}>
      <img width={"80px"} src="/images/loginIcon.png" />
    </button>
  );
}

type LoggedInProps = {
  isLogged: boolean;
  userName: string;
};

function Loggedin({ isLogged, userName }: LoggedInProps) {
  if (!isLogged) return null;
  function handleLogOut() {
    removeLocalStorage();
    window.location.assign("/");
  }

  function removeLocalStorage() {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("role");
  }
  return (
    <div className="row">
      <div className="col-sm-6 p-3">
        <h5>Bienvenido</h5>
        <h4 className="px-3 fw-bold">{userName}</h4>
      </div>
      <div className="col-sm-6">
        <button className="btn" onClick={handleLogOut}>
          <img width={"80px"} src="/images/logoutIcon.png" />
        </button>
      </div>
    </div>
  );
}
