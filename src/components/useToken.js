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
    localStorage.removeItem("user_id");
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;