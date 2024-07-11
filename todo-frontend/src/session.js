import { jwtDecode } from "jwt-decode";

const setToken = (token) => {
    localStorage.setItem('token', token);
};

const setUserid = (userid) => {
    localStorage.setItem('userid', userid);
};

const getToken = () => {
    return localStorage.getItem('token');
};

const getUserid = () => {
    return localStorage.getItem('userid');
};

const isUserAuth = () => {
    const userid = getUserid();
    return !!userid;
};

const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          logout();
          window.location.href = '/login';
            return false;
        }
        return true;
    } catch (e) {
        logout();
        return false;
    }
};

const isLogged = () => {
    return isAuthenticated() && isUserAuth();
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.reload();
};

export {
    setToken,
    getToken,
    isAuthenticated,
    logout,
    isUserAuth,
    setUserid,
    getUserid,
    isLogged,
};
