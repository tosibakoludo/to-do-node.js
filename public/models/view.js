var view = (function () {
    const DOMStrings = {
        myList: 'myList',
        userInput: 'userInput',
        addButton: 'button1',
        deleteButton: 'button2'
    }

    return {
        getDOMStrings: function () {
            return DOMStrings;
        },
        getInput: function () {
            return document.getElementById(DOMStrings.userInput).value;
        },
        addItemToView: function (obj) {
            const lista = document.getElementById(DOMStrings.myList);
            const listItem = document.createElement("li");

            const chekBox = document.createElement("input");
            chekBox.setAttribute("type", "checkbox");

            chekBox.setAttribute("id", obj.toDoText);
            if (obj.done) {
                chekBox.checked = true;
            }

            const span = document.createElement("span");
            span.setAttribute("class", "precrtano");
            span.innerText = obj.toDoText;

            listItem.appendChild(chekBox);
            listItem.appendChild(span);
            lista.appendChild(listItem);

            userInput.value = "";

            return chekBox;
        },
        removeItemsFromView: function () {
            const removeArr = [];
            const items = document.querySelectorAll("input[type=checkbox]:checked");
            items.forEach(elem => {
                removeArr.push(elem.nextSibling.textContent);
                elem.parentElement.remove();
            }
            );
            return removeArr;
        },
        filterByStatus: function () {
            let items = document.querySelectorAll("input[type=checkbox]");
            let status = document.querySelector("input[type=radio]:checked");
            if (status.value == "done") {
                items = [...items].filter(elem => elem.checked)
            }
            if (status.value == "todo") {
                items = [...items].filter(elem => !elem.checked)
            }
            return [...items];
        },
        filterByText: function (items) {
            let val = document.getElementById("search").value;
            if (val) {
                items = [...items].filter(elem => elem.nextSibling.textContent.toLowerCase().indexOf(val.trim().toLowerCase()) != -1);
            }
            return items;
        },
        displayFilteredItems: function (filteredItems) {
            const items = document.getElementById(DOMStrings.myList).querySelectorAll("li");
            filteredItems = filteredItems.map(filteredElem => filteredElem.id);
            [...items].forEach(elem => {
                console.log(elem.firstChild.id);
                if (filteredItems.includes(elem.firstChild.id)) {
                    elem.style.display = "block";
                }
                else {
                    elem.style.display = "none";
                }
            });
        }
    }
})();

export default view;