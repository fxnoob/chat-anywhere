import "@babel/polyfill";
import fireBaseService from "./services/firebaseService";
let AppInitState = 0; // it means app is off on startup

/**
 * Main extension functionality
 *
 * @class Main
 */
class Main {
  constructor() {
    this.init();
  }
  /**
   * init
   *
   */
  init = () => {
    this.firebaseAuth();
    this.popUpClickSetup();
  };
  popUpClickSetup() {
    chrome.browserAction.onClicked.addListener(tab => {
      if (this.toggleApp()) {
      } else {
        this.stopApp();
      }
    });
  }

  /**
   *firebase auth
   *
   */
  firebaseAuth = () => {
    // Listen for auth state changes.
    fireBaseService.auth().onAuthStateChanged(function(user) {
      console.log(
        "User state change detected from the Background script of the Chrome Extension:",
        user
      );
    });
  };

  /**
   * toggle app
   *
   * @method
   * @memberof Main
   */
  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  /**
   * stop app
   *
   * @method
   * @memberof Main
   */
  stopApp = () => {
    AppInitState = 0;
  };
}
