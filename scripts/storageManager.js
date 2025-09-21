/**
 * Saves an item to the browser's local storage
 * @param {String} item Item to be saved to local storage
 */
function saveItem(item) {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = [];
  }
  bookmarksStorage.push(item);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
}

/**
 * Gets the provided item from storage if found
 * @param {String} item The item to search for
 * @returns The item if found otherwise undefined
 */
function getItem(item) {
  let bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarksStorage === null) {
    bookmarksStorage = [];
  }
  return bookmarksStorage.find((foundItem) => foundItem === item);
}

/**
 * Removes an item from the browser's local storage
 * @param {String} item Item to be removed from local storage
 */
function removeItem(item) {
  const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  const newBookmarks = [];
  bookmarksStorage.forEach((storedItem) => {
    if (storedItem !== item) {
      newBookmarks.push(storedItem);
    }
  });
  localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
}

/**
 * Updates an item in local storage
 * @param {String} itemToUpdate Item to update
 * @param {String} newItem The item to replace with
 */
function updateItem(itemToUpdate, newItem) {
  const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
  let indexFound;
  const foundItem = bookmarksStorage.find((foundItem, index) => {
    indexFound = index;
    return foundItem === itemToUpdate;
  });

  if (foundItem) {
    bookmarksStorage[indexFound] = newItem;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksStorage));
  }
}

export default { saveItem, getItem, removeItem, updateItem };
