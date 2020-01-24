import * as firebase from "firebase";
import Constants from "../../constants";
import AuthServiceClass from "./authSevice";

const authService = new AuthServiceClass();
/**
 * Firebase Utility class
 * https://github.com/firebase/quickstart-js/tree/master/auth/chromextension
 *
 * @export
 * @class firebaseServiceClass
 */
class firebaseServiceClass {
  constructor() {
    this.firebase = firebase;
    this.authToken = 0;
    this.init();
  }

  /**
   * Initialization
   * @method
   * @memberOf firebaseServiceClass
   *
   */
  init = () => {
    this.firebase.initializeApp(Constants.firebase.config);
  };

  /**
   * general puropose error handler for firebase
   * @method
   * @memberOf firebaseServiceClass
   *
   */
  errorHandler = async error => {
    if (error.code === "auth/invalid-credential") {
      await authService.removeTokenFromCache(this.authToken);
      this.authToken = 0;
    }
  };

  /**
   * get authenticated user data from firebase
   * @method
   * @memberOf firebaseServiceClass
   *
   */
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

  /**
   * Save messages of user into firestore
   * @method
   * @memberOf firebaseServiceClass
   */
  saveMessageToFirestore = (details) => {
    console.log("saveMessageToFirestore called", details);
    const {email, userName, text, profilePicUrl, url} = details;
    // Add a new message entry to the database.
    return firebase.firestore().collection('messages').add({
      url: url, // current active tab url
      email: email,
      userName: userName,
      text: text,
      profilePicUrl: profilePicUrl,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  };

  /**
   *  Load stored messages from firestore
   *@method
   * @param listenerCallback object object
   *@memberOf firebaseServiceClass
   */
  getMessages = (listenerCallback) => {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = this.firebase.firestore()
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(12);
     if (listenerCallback) {
       query.onSnapshot((snapshot) => {
         snapshot.docChanges().forEach(function(change) {
           listenerCallback(change);
           // if (change.type === 'removed') {
           //   deleteMessage(change.doc.id);
           // } else {
           //   var message = change.doc.data();
           //   displayMessage(change.doc.id, message.timestamp, message.name,
           //     message.text, message.profilePicUrl, message.imageUrl);
           // }
         });
       });
     }
  }
  /**
   *Logout user
   * @method
   * @memberOf firebaseServiceClass
   */
    logout = () => {
      console.log("logout");
      this.firebase.auth().signOut();
    }
}
const firebaseService = new firebaseServiceClass();
export default firebaseService;
