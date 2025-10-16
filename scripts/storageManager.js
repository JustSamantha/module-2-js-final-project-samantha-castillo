export class StorageManager {
  static #getBookmarksFromStorage() {
    let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
    if (bookmarksStorage === null) {
      bookmarksStorage = {};
    }
    return bookmarksStorage;
  }

  /**
   * Saves an item to the browser's local storage
   * @param {Object} name Item to be saved to local storage
   */
  static saveItem(item) {
    let bookmarksStorage = StorageManager.#getBookmarksFromStorage();
    bookmarksStorage = { ...bookmarksStorage, ...item };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
  }

  /**
   * Gets the object with the provided key
   * @param {String} key The key of the object to search for
   * @returns The object if found otherwise undefined
   */
  static getItem(key) {
    let bookmarksStorage = StorageManager.#getBookmarksFromStorage();
    return bookmarksStorage[key];
  }

  /**
   * Gets all the items stored
   * @returns The object of items
   */
  static getAllItems() {
    let bookmarksStorage = StorageManager.#getBookmarksFromStorage();
    return bookmarksStorage;
  }

  /**
   * Save all the items replacing the existing bookmarks
   * @param {Object} items The items object to replace with
   */
  static saveAllItems(items) {
    localStorage.setItem('bookmarks', JSON.stringify(items));
  }

  /**
   * Removes an item from the browser's local storage
   * @param {String} key The key of the object to delete
   */
  static removeItem(key) {
    const bookmarksStorage = StorageManager.#getBookmarksFromStorage();
    delete bookmarksStorage[key];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
  }

  /**
   * Updates an item in local storage
   * @param {Object} itemToUpdate Item to update
   * @param {Object} newItem The item to replace with
   */
  static updateItem(itemToUpdate, newItem) {
    const bookmarksStorage = StorageManager.#getBookmarksFromStorage();
    StorageManager.removeItem(Object.keys(itemToUpdate)[0]);
    StorageManager.saveItem(newItem);
  }
}
