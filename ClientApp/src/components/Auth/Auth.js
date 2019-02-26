import auth0 from 'auth0-js';
import history from './History';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'dev-yf4skfb4.auth0.com',
        clientID: 'x5tAE7fdv3Ck7JlptWKspfwCwTcjA7L6',
        redirectUri: 'https://saving-app.herokuapp.com/callback',
        audience: 'https://savingsapp.api.com',
        responseType: 'token id_token',
        scope: 'openid profile'
    });


    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.goToGoals('/GoalOverview');
            } else if (err) {
                history.replace('/');
                console.log(err);
            }
        });
    }
    goToGoals = () => {
        window.location.href = "/GoalOverview"
    }
    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/GoalOverview');
    }


    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        history.replace('/');
    }

    login() {
        this.auth0.authorize();
    }


    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    userProfile;
    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            //throw new Error('No Access Token found');
        }
        return accessToken;
    }
    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }
}