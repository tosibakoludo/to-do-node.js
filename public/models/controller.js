var controller = function (model, view) {
    let DOM = view.getDOMStrings();

    let setupListeners = function () {
        const addButton = document.getElementById(DOM.addButton);
        addButton.addEventListener("click", ctrlAddItem);
        const removeButton = document.getElementById(DOM.deleteButton);
        removeButton.addEventListener("click", ctrlRemoveItems);
        document.getElementById("search").addEventListener("keyup", ctrlFilterChange);
        document.getElementsByName("status").forEach(elem => {
            elem.addEventListener("change", ctrlFilterChange);
        });
    }

    let ctrlReadItemsFromLS = function () {
        let items = model.readFromLS();

        for (let i = 0; i < items.length; i++) {
            let chekBox;
            // chekBox = document.getElementById(`${items[i].toDoText}`);
            chekBox = view.addItemToView(items[i]);

            let todo = chekBox.nextSibling.textContent;

            chekBox.addEventListener("click", function () {
                let updatedItem;
                if (chekBox.checked == true) {
                    updatedItem = model.updateItem(todo, todo, true);
                } else {
                    updatedItem = model.updateItem(todo, todo, false);
                }
                if (updatedItem !== -1) {
                    model.updateLS();
                }
            });

            chekBox.nextSibling.addEventListener("dblclick", function () {
                chekBox.nextSibling.contentEditable = true;
            });

            chekBox.nextSibling.addEventListener("blur", function () {
                chekBox.nextSibling.contentEditable = false;
                editItem(todo, this.textContent);
                ctrlFilterChange();
            });
        }
    }

    let ctrlAddItem = function () {
        let input = view.getInput();
        if (input.trim() !== "") {
            let newItem = model.addNewItem(input, false);
            if (newItem !== -1) {
                model.updateLS();

                let chekBox;
                // chekBox = document.getElementById(`${newItem.toDoText}`);
                chekBox = view.addItemToView(newItem);
                
                let todo = chekBox.nextSibling.textContent;

                chekBox.addEventListener("click", function () {
                    let updatedItem;
                    if (chekBox.checked == true) {
                        updatedItem = model.updateItem(todo, todo, true);
                    } else {
                        updatedItem = model.updateItem(todo, todo, false);
                    }
                    if (updatedItem !== -1) {
                        model.updateLS();
                    }
                });

                chekBox.nextSibling.addEventListener("dblclick", function () {
                    chekBox.nextSibling.contentEditable = true;
                });

                chekBox.nextSibling.addEventListener("blur", function () {
                    chekBox.nextSibling.contentEditable = false;
                    editItem(todo, this.textContent);
                    ctrlFilterChange();
                });
            }
        }
    }

    let ctrlRemoveItems = function () {
        const removeArr = view.removeItemsFromView();
        model.removeItems(removeArr);
        model.updateLS();
    }

    let editItem = function (oldValue, newValue) {
        if (newValue.trim() !== "") {
            let updatedItem = model.updateItem(oldValue, newValue);
            if (updatedItem !== -1) {
                model.updateLS();
            }
        }
    }

    let ctrlFilterChange = function () {
        let filteredItems = view.filterByStatus();
        filteredItems = view.filterByText(filteredItems);
        view.displayFilteredItems(filteredItems);
    }

    return {
        init: function () {
            ctrlReadItemsFromLS();
            setupListeners();
        }
    }
};

export default controller;
