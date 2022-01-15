import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAeOmEq7wKD5TPU6FSGchBoe5jsnInMFx0",
    authDomain: "chatapp-52c31.firebaseapp.com",
    projectId: "chatapp-52c31",
    storageBucket: "chatapp-52c31.appspot.com",
    messagingSenderId: "1098619486032",
    appId: "1:1098619486032:web:7a4b3528a0434418b17655",
    measurementId: "G-EMKGR5TL58"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

// auth.useEmulator('http://localhost:9099')
// if(window.location.hostname === 'localhost'){
//   db.useEmulator('localhost', '8080')
// }

export {db, auth}
export default firebase