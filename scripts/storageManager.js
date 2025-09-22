/**
 * Saves an item to the browser's local storage
 * @param {Object} name Item to be saved to local storage
 */
function saveItem(item) {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = {};
  }
  bookmarksStorage = { ...bookmarksStorage, ...item };
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
}

/**
 * Gets the object with the provided key
 * @param {String} key The key of the object to search for
 * @returns The object if found otherwise undefined
 */
function getItem(key) {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = {};
  }
  return bookmarksStorage[key];
}

/**
 * Gets all the items stored
 * @returns The object of items
 */
function getAllItems() {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = {};
  }
  return bookmarksStorage;
}

/**
 * Removes an item from the browser's local storage
 * @param {String} key The key of the object to delete
 */
function removeItem(key) {
  const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = {};
  }
  delete bookmarksStorage[key];
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
}

/**
 * Updates an item in local storage
 * @param {Object} itemToUpdate Item to update
 * @param {Object} newItem The item to replace with
 */
function updateItem(itemToUpdate, newItem) {
  const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = {};
  }
  removeItem(Object.keys(itemToUpdate)[0]);
  saveItem(newItem);
}

export default { saveItem, getItem, getAllItems, removeItem, updateItem };
