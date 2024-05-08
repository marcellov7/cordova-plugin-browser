var PLUGIN_NAME = "BrowserPlugin";
// @ts-ignore
var exec = require("cordova/exec");
var promiseReady;

exports.open =
/**
 * Opens a url in browser activity.
 *
 * @param url The url to open.
 * @param options The options for the browser.
 *
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.browser.open("https://google.com");
 * cordova.plugins.browser.open("https://google.com", {readerMode: true});
 */
function(url, options) {
    if (!promiseReady) {
        promiseReady = new Promise(function(resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "ready", []);
        });
    }

    return promiseReady.then(function() {
        return new Promise(function(resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "open", [url, options || {}]);
        });
    });
};

exports.close =
/**
 * Closes the browser activity if it is open.
 *
 * @returns {Promise<void>} Callback when operation is completed
 *
 * @example
 * cordova.plugins.browser.close();
 */
function() {
    return new Promise(function(resolve, reject) {
        exec(resolve, reject, PLUGIN_NAME, "close", []);
    });
};

exports.onLoad =
/**
 * Trigger a callback when browser finished loading page successfully.
 *
 * @param {() => void} callback Callback function
 * @param {(error: string) => void} [errorCallback] Error callback function
 *
 * @example
 * cordova.plugins.browser.onLoad(() => {
 *     console.log("my url is loaded");
 * });
 */
function(callback, errorCallback) {
    exec(callback, errorCallback, PLUGIN_NAME, "onLoad", []);
};

exports.onClose =
/**
 * Trigger a callback when browser activity was closed.
 *
 * @param {() => void} callback Callback function
 * @param {(error: string) => void} [errorCallback] Error callback function
 *
 * @example
 * cordova.plugins.browser.onClose(() => {
 *     console.log("browser activity was closed");
 * });
 */
function(callback, errorCallback) {
    exec(callback, errorCallback, PLUGIN_NAME, "onClose", []);
};
