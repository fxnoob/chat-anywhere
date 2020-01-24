import "@babel/polyfill";
import fireBaseService from "./services/firebaseService";
import Db, { Schema } from "./services/dbService";

let AppInitState = 0; // it means app is off on startup
const db = new Db();
const schema = new Schema();

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
   * initialization of services
   * @method
   *@memberOf Main
   */
  init = async () => {
    await this.initDb();
    this.firebaseAuth();
    this.popUpClickSetup();
  };

  /**
   *Database intialization
   * @method
   * @memberOf Main
   */
  initDb = async () => {
    const res = await db.get("loadedFirstTime");
    if (!res.hasOwnProperty("loadedFirstTime")) {
      await db.set({
        loadedFirstTime: true,
        ...schema.data
      });
    }
  };

  /**
  * Popup click setup
  * @method
  * @memberOf Main
  */
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
   *@method
   * @memberOf Main
   */
  firebaseAuth = () => {
    // Listen for auth state changes.
    fireBaseService.firebase.auth().onAuthStateChanged(function(user) {
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
