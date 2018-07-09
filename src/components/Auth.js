import auth0 from 'auth0-js';
import history from './history.js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'workshop-on-forster.eu.auth0.com',
    clientID: '7mixQISN6gnZ0OiFZkYAiKyyuUIMxhw8',
    redirectUri: 'http://www.workshop-on-forster.de/admin',
    responseType: 'token id_token'
  });
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }


  login() {
    this.auth0.authorize();
  }
  handleAuthentication() {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       this.setSession(authResult);
       //eslint-disable-next-line
       history.replace('/admin');
     } else if (err) {
       //eslint-disable-next-line
       history.replace('/');
       console.log(err);
     }
   });
 }

 setSession(authResult) {
   // Set the time that the Access Token will expire at
   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   localStorage.setItem('access_token', authResult.accessToken);
   localStorage.setItem('id_token', authResult.idToken);
   localStorage.setItem('expires_at', expiresAt);
   // navigate to the home route
   //eslint-disable-next-line
   history.replace('/');
 }

 logout() {
   // Clear Access Token and ID Token from local storage
   localStorage.removeItem('access_token');
   localStorage.removeItem('id_token');
   localStorage.removeItem('expires_at');
   // navigate to the home route
   //eslint-disable-next-line
   history.replace('/');
 }

 isAuthenticated() {
   // Check whether the current time is past the
   // Access Token's expiry time
   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
   return new Date().getTime() < expiresAt;
 }
}
