// Importing the token decode capabilities from the jwt library
import decode from 'jwt-decode'

class Authenticate {
// This retreives the profile associated with the token that is decoded
    getProfile() {return decode(this.getToken()); };
// This checks local storage for a token and retrieves it    
    getToken() { return localStorage.getItem('id_token'); };
// This checks to see if the token value is truthy, and if it hasnt expired yet,
// to see if a user is logged in
    loggedIn() {
        const token = this.getToken();
        return (!!token && !this.isTokenExpired(token));
    };
// This function checks if a token has expired
    isTokenExpired() {
        try {
// Here, it checks to see if the token has gone over the alotted time            
           const decoded = decode(token);
           if (decoded.exp < Date.now() / 1000) {
// And if so, it removes it from the local storage            
            localStorage.removeItem('id_token')
            return true;
           } else return false;
        } catch (err) {
           return false;
        }
    };
// This function handles the login process
    login(idToken) {
// This line sets the idToken value into the id_token field in local storage       
       localStorage.setItem('id_token', idToken);
// This line redirects the user to the homepage after successful login      
       window.location.assign('/'); 
    }

    logout() {
// This line removes the token from the local storage         
        localStorage.removeItem('id_token');
// This line redirects the user to the homepage after successful logout        
        window.location.assign('/');
    }

}

// Creates a new instance of the Authenticate object provided via the jwt library
export default new Authenticate ()