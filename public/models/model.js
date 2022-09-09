var model = (function () {
    const items = [];

    class ToDoItem {
        constructor(toDoText, status) {
            this.toDoText = toDoText;
            this.done = status;
        }
    }

    function isItemInArray(text) {
        let isFound = false;
        items.forEach(elem => {
            if (elem.toDoText == text) {
                isFound = true;
            }
        })
        return isFound;
    }

    return {
        readFromLS: function () {
            let itemsLS = JSON.parse(localStorage.getItem("items"));
            if (itemsLS !== null) {
                for (let i = 0; i < itemsLS.length; i++) {
                    items.push(itemsLS[i]);
                }
            }
            return items;
        },
        updateLS: function () {
            localStorage.setItem("items", JSON.stringify(items));
        },
        addNewItem: function (inputText, status) {
            let obj = new ToDoItem(inputText, status);
            if (!isItemInArray(inputText)) {
                items.push(obj);
                return obj;
            } else {
                return -1;
            }
        },
        updateItem: function (oldText, newText, status) {
            let obj = null;
            let success = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].toDoText == oldText) {
                    if (typeof status !== 'undefined') {
                        items[i].done = status;
                        obj = items[i];
                        success = true;
                    } else if (!isItemInArray(newText)) {
                        items[i].toDoText = newText;
                        obj = items[i];
                        success = true;
                    }
                }
            }
            if (success) {
                return obj;
            } else {
                return -1;
            }
        },
        removeItems: function (itemsToRemove) {
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < itemsToRemove.length; j++) {
                    if (items[i].toDoText == itemsToRemove[j]) {
                        items.splice(i, 1);
                    }
                }
            }
        }
    }
})();

export default model;
