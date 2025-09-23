import storageManager from './storageManager.js';

const bkmrkDialog = document.querySelector('dialog');
const bkmrkDialogTitle = document.querySelector('dialog h2');
const bkmrkFormURL = document.querySelector('#bookmarkURL');
const bkmrkFormName = document.querySelector('#bookmarkName');
const bkmrkBtn = document.querySelector('#addBookmarkBtn');
const closeBkmrkDialogBtn = document.querySelector('#closeBookmarkDialogBtn');
const submitBkmrkDialogBtn = document.querySelector('#submitBookmarkDialogBtn');
const bkmrkForm = document.querySelector('#bookmarkForm');
const editBookmarkBtns = document.querySelectorAll('.editBookmarkBtn');
const deleteBookmarkBtns = document.querySelectorAll('.deleteBookmarkBtn');
const bkmrkList = document.querySelector('#listOfBookmarks');
const prevBookmarkURL = document.querySelector('#prevBookmarkURL');
const prevBookmarkName = document.querySelector('#prevBookmarkName');
const sortBtn = document.querySelector('#sortBookmarksBtn');
let sortingDirection = 'desc';

/**
 * Adds a li element with the provided parameters and inserts its into the DOM
 * @param {string} name The link name to create the item with
 * @param {string} url The link url to create the item with
 */
function addItemHTML(name, url) {
  // Main li
  const mainLi = document.createElement('li');
  // Item name and url
  const bookmarkTextLink = document.createElement('a');
  bookmarkTextLink.className = 'bookmarkTextLink';
  bookmarkTextLink.innerHTML = name + ' - ' + url;
  bookmarkTextLink.target = '_blank';
  bookmarkTextLink.name = name;
  bookmarkTextLink.href = url;
  // Bookmark Icons
  const bookmarkIcons = document.createElement('div');
  bookmarkIcons.className = 'bookmarkIcons';
  // Edit bookmark
  const editBookmarkLink = document.createElement('a');
  editBookmarkLink.href = '#';
  editBookmarkLink.className = 'editBookmarkBtn';
  editBookmarkLink.addEventListener('click', showEditBkmrkModal);
  // Delete bookmark
  const deleteBookmarkLink = document.createElement('a');
  deleteBookmarkLink.href = '#';
  deleteBookmarkLink.className = 'deleteBookmarkBtn';
  deleteBookmarkLink.addEventListener('click', deleteBookmark);

  // Assemble everything
  bookmarkIcons.appendChild(editBookmarkLink);
  bookmarkIcons.appendChild(deleteBookmarkLink);
  mainLi.appendChild(bookmarkTextLink);
  mainLi.appendChild(bookmarkIcons);

  bkmrkList.prepend(mainLi);
}

/**
 * Handles the click on the delete bookmark icon
 * @param {Event} e The event object
 */
function deleteBookmark(e) {
  const liNode = e.target.parentNode.parentNode;
  liNode.remove();
  storageManager.removeItem(liNode.children[0].name);
}

/**
 * Handles the form submit on the add and edit bookmark form
 * @param {Event} e The event object
 */
function addEditBookmark(e) {
  e.preventDefault();
  const inStoreObj = storageManager.getItem(bkmrkFormName.value);
  const itemToStore = {};
  itemToStore[bkmrkFormName.value] = {
    name: bkmrkFormName.value,
    url: bkmrkFormURL.value,
  };
  if (bkmrkDialogTitle.textContent.includes('Add') && !inStoreObj) {
    // Add bookmark
    addItemHTML(bkmrkFormName.value, bkmrkFormURL.value);
    storageManager.saveItem(itemToStore);
    bkmrkDialog.close();
  } else if (!inStoreObj) {
    // Edit bookmark
    const prevItem = {};
    const liElements = bkmrkList.children;
    prevItem[prevBookmarkName.value] = {
      name: prevBookmarkName.value,
      url: prevBookmarkURL.value,
    };
    storageManager.updateItem(prevItem, itemToStore);
    for (let i = 0; i < liElements.length; i++) {
      const linkElement = liElements[i].children[0];
      if (linkElement.name === prevBookmarkName.value) {
        linkElement.name = bkmrkFormName.value;
        linkElement.href = bkmrkFormURL.value;
        linkElement.textContent = bkmrkFormName.value + ' - ' + bkmrkFormURL.value;
        break;
      }
    }
    bkmrkDialog.close();
  } else {
    alert('Bookmark already exists');
  }
}

/**
 * Handles the click on the add bookmark icon and opens the modal with the form
 * @param {Event} e The event object
 */
function showAddBkmrkModal(e) {
  bkmrkDialogTitle.textContent = 'Add Bookmark';
  submitBkmrkDialogBtn.textContent = 'Add';
  if (chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      bkmrkFormURL.value = tabs[0].url;
      bkmrkFormName.value = tabs[0].title;
      bkmrkDialog.showModal();
    });
  } else {
    bkmrkFormURL.value = document.URL;
    bkmrkFormName.value = document.title;
  }
  bkmrkDialog.showModal();
}

/**
 * Handles the click on the edit bookmark icon and opens the modal with the form
 * @param {Event} e The event object
 */
function showEditBkmrkModal(e) {
  const linkNode = e.target.parentNode.parentNode.children[0];
  bkmrkFormURL.value = linkNode.href;
  bkmrkFormName.value = linkNode.name;
  prevBookmarkURL.value = linkNode.href;
  prevBookmarkName.value = linkNode.name;
  bkmrkDialogTitle.textContent = 'Edit Bookmark';
  submitBkmrkDialogBtn.textContent = 'Save';
  bkmrkDialog.showModal();
}

/**
 * Handles the click on sort bookmarks button
 * @param {Event} e The event object
 */
function sortBookmarks(e) {
  const allItems = storageManager.getAllItems();
  const ordered = sortObject(allItems, sortingDirection);
  storageManager.saveAllItems(ordered);

  // Re render all bookmarks
  while (bkmrkList.firstChild) {
    bkmrkList.removeChild(bkmrkList.firstChild);
  }
  for (let key in ordered) {
    addItemHTML(ordered[key].name, ordered[key].url);
  }
  if (sortingDirection === 'desc') {
    sortingDirection = 'asc';
  } else {
    sortingDirection = 'desc';
  }
}

/**
 * Sorts an object based on the keys
 * @param {Object} objectToSort Object to sort
 * @param {String} sortDirection Sort direction, asc or desc
 * @returns The ordered object
 */
function sortObject(objectToSort, sortDirection) {
  let orderedKeys = Object.keys(objectToSort).sort();
  if (sortDirection === 'asc') {
    orderedKeys = orderedKeys.reverse();
  }
  const ordered = orderedKeys.reduce((obj, key) => {
    obj[key] = objectToSort[key];
    return obj;
  }, {});

  return ordered;
}

closeBkmrkDialogBtn.addEventListener('click', (e) => {
  bkmrkDialog.close();
});
editBookmarkBtns.forEach((editBookmarkBtn) => {
  editBookmarkBtn.addEventListener('click', showEditBkmrkModal);
});
deleteBookmarkBtns.forEach((deleteBookmarkBtn) => {
  deleteBookmarkBtn.addEventListener('click', deleteBookmark);
});
bkmrkBtn.addEventListener('click', showAddBkmrkModal);
bkmrkForm.addEventListener('submit', addEditBookmark);
sortBtn.addEventListener('click', sortBookmarks);

// Init the page
const allBookmarks = storageManager.getAllItems();
for (let key in allBookmarks) {
  addItemHTML(allBookmarks[key].name, allBookmarks[key].url);
}
