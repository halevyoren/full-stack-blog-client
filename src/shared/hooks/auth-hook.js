import { useState, useCallback, useEffect } from "react";

let logoutTimer; // for the id of TimeOut to know wich one to clear

// a hook to manage the authentication logic -> login, logout, tokens, auto login/logout, userId
export const useAuth = () => {
  const [token, setToken] = useState(null); // a validation token for logged n user
  const [tokenExperationDate, setTokenExperationDate] = useState(); // when the token becomes invalid
  const [userId, setUserId] = useState(null); // the id of the loggen in user

  const login = useCallback((uid, token, expirationDate) => {
    //setting the token and the user id
    setToken(token);
    setUserId(uid);

    // getting the already existing expiration date or
    // getting the login time + 1 hour (token expiration) --> 1000 (a second) * 60 (a minute) * 60 (an hour)
    const newTokenexpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExperationDate(newTokenexpirationDate);
    //save token to local storage under "userData"
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: newTokenexpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    //reseting  the token, tokenExperationDate and the user id
    setToken(null);
    setTokenExperationDate(null);
    setUserId(null);
    //removing the token from local storage
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExperationDate) {
      // logged in
      const remainingTime =
        tokenExperationDate.getTime() - new Date().getTime(); //time in milliseconds

      //autmaically logs user out in remainingTime (in milliseconds)
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // clearing Timeout with the id in logoutTimer
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExperationDate]);

  useEffect(() => {
    // get data from the local storage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      // if all the login data is in the local storage and it not epxired then log in
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { login, logout, token, userId };
};
