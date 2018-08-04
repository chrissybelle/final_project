import firebase from 'firebase';
 // Configure Firebase.
const config = {
    apiKey: 'AIzaSyCGyfwSt_X1JxdYfNQIA-Zykb1VW3mSxEY',
    authDomain: 'your-perfect-recipes.firebaseapp.com',
    databaseURL: 'https://your-perfect-recipes.firebaseio.com'
    // ...
};

firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const reference = firebase
export default firebase; 