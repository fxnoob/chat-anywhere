import * as firebase from "firebase";
import Constants from "../../constants";
import AuthServiceClass from "./authSevice";

const authService = new AuthServiceClass();

class firebaseServiceClass {
  constructor() {
    this.firebase = firebase;
    this.authToken = 0;
    this.init();
  }
  init = () => {
    this.firebase.initializeApp(Constants.firebase.config);
  };
  errorHandler = async error => {
    if (error.code === "auth/invalid-credential") {
      await authService.removeTokenFromCache(this.authToken);
      this.authToken = 0;
    }
  };
  getUser = async () => {
    this.authToken = await authService.getToken();
    if (this.authToken) {
      // Authorize Firebase with the OAuth Access Token.
      const credential = firebase.auth.GoogleAuthProvider.credential(
        null,
        this.authToken
      );
      return await firebase.auth().signInWithCredential(credential);
    } else {
      throw new Error("AUTH_ERROR");
    }
  };
}
const firebaseService = new firebaseServiceClass();
export default firebaseService;
