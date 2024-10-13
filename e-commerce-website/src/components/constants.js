export const FIREBASE_KEY= process.env.REACT_APP_FIREBASE_KEY ;
export const SIGN_IN_WITH_PASSWORD_URL= `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
export const SIGN_UP_URL= `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
export const UPDATE_PASSWORD_URL=`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_KEY}`