/// <reference lib="dom" />
import * as firebaseAdmin from "firebase-admin";
/// <reference lib="dom" />
import * as firebase from "firebase";


const adminConfig = require("../../../../server/firebase-admin-config.json")

const adminApp = firebaseAdmin.initializeApp( { credential: firebaseAdmin.credential.cert( JSON.parse( JSON.stringify( adminConfig ) ) ) } );
export { adminApp };

const config = require("../../../../server/firebase-config")

const app = firebase.default.initializeApp( config );
export { app };

export async function sendEmailVerification(uid:string){
        const token = await adminApp.auth().createCustomToken(uid);
        const result = await app.auth().signInWithCustomToken(token);
        await result.user?.sendEmailVerification();
        await app.auth().signOut();
}