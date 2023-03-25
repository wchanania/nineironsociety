import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('NineIronToken');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('NineIronToken', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("NineIronToken");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;