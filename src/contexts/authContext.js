import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedUser, setLoggedUser] = useState({
    token: "",
    user: {},
  });

  useEffect(() => {
    const jsonLoggedUser = localStorage.getItem("loggedUser");
    const parseLoggedUser = JSON.parse(jsonLoggedUser || '""');

    if (parseLoggedUser.token) {
      setLoggedUser(parseLoggedUser);
    } else {
      setLoggedUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
