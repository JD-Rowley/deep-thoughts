import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is stil logged in
    loggedIn() {
        // checks if there is a saved token and that it's still valid
        const token = this.getToken();
        
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // save user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with relaod
    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // reload page and reset state
        window.location.assign('/');
    }
}

export default new AuthService();