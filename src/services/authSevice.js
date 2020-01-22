/**
 * Chrome storage abstraction class
 * https://developer.chrome.com/apps/tut_oauth
 *
 * @export
 * @class oauth
 */
export default class oauth {
  constructor() {}
  /**
   * get access token from google oauth
   *
   * @returns {Promise}
   * @memberof oauth
   */
  getToken() {
    return new Promise((resolve, reject) => {
      try {
        chrome.identity.getAuthToken({ interactive: true }, function(token) {
          resolve(token);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * remove auth token from cache
   *
   * @param token String String
   * @returns {Promise}
   * @memberof oauth
   */
  removeTokenFromCache = (token) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.identity.removeCachedAuthToken({ token: token }, () => {
          resolve('CACHE_CLEARED');
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
