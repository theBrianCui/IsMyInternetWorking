function getByClass(selector) {
    return document.getElementsByClassName(selector);
}

// shortcut methods for the localStorage API
// https://developer.mozilla.org/en-US/docs/Web/API/Storage
const storage = {
    get: (key) => { return window.localStorage.getItem(key); },
    set: (key, value) => { return window.localStorage.setItem(key, value); },
    remove: (key) => { window.localStorage.removeItem(key); },
    clear: () => { window.localStorage.clear(); }
}

export { getByClass, storage };