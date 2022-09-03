import {initializeApp} from 'firebase/app'
import { getAuth, signInWithPopup,  signOut , GoogleAuthProvider , createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import firebaseConfig from '../../../firebase.config'
export const initializeLoginFramework = () => {
    initializeApp(firebaseConfig);
}
export const handleGoogleSignIn = ()=> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signInUser = {
        isSignIn : true,
        name : displayName ,
        email : email ,
        photo : photoURL
      }
      return signInUser;
    
    })
  }

export const handleWithSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
    .then(res => {
      const signOutUser = {
        isSignIn : false,
        name : '',
        email: '',
        photo:''
      }
      return signOutUser
    }).catch((error) => {
      // An error happened.
    })};


export const createWithEmailAndPassword = (name , email, password) => {
    const auth = getAuth();
      return createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateName(name);
        verifyEmail(name)
        return newUserInfo;
      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.error = err.code;
        newUserInfo.success = false;
        return newUserInfo;
      })
}

export const signInEmailAndPassword = (email,password) => {
    const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
        })
      .catch((err) => {
        const newUserInfo = {};
        newUserInfo.error = err.code;
        newUserInfo.success = false;
        return newUserInfo;
      });
}
export const updateName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log('user name added successfully')
    }).catch((error) => {
      console.log(error)
    });

  }

const verifyEmail = () => {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}

export const resetEmail = email => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}