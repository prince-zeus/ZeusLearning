import data from './data.json' assert {type: 'json'};

const title = document.querySelector(".title");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoInputButton = document.querySelector(".todo-input-button");
let lastListItem;

(function setTitle() {
    title.textContent = "Prince Dhameliya's To Do List";
}());

// Display Items Using Json File
// (function setListItem() {
//     data.map(listItem => {
//         const {is_checked, todo_title} = listItem;
//         var isItemChecked = is_checked ? "checked" : "";
//         todoList.innerHTML +=
//         `<li class="todo-list-item">
//             <input type="checkbox" name="todo-check" class="todo-check" ${isItemChecked} />
//             <input type="text" class="todo-title-input ${isItemChecked}" value="${todo_title}" readonly />
//             <button type="button" class="todo-action edit-btn ${isItemChecked}"><img src="assets/edit.png" alt="File Edit"></button>
//             <button type="button" class="todo-action dlt-btn"><img src="assets/delete.png" alt="File Delete"></button>
//         </li>`
//     })
//     saveData();
// }());

todoInputButton.addEventListener('click', e => {
    e.stopPropagation();
    var todoInputText = todoInput.value;
    if(todoInputText.length > 0) {
        todoList.innerHTML = 
        `<li class="todo-list-item">
            <input type="checkbox" name="todo-check" class="todo-check">
            <input type="text" class="todo-title-input" value="${todoInputText}" readonly />
            <button type="button" class="todo-action edit-btn"><img src="assets/edit.png" alt="File Edit"></button>
            <button type="button" class="todo-action dlt-btn"><img src="assets/delete.png" alt="File Delete"></button>
        </li>` + todoList.innerHTML;
        todoInput.value = "";
    }
    else {
        alert("Please Add Task to be done!");
    }
    saveData();
})

function putCursorAtTheEnd(inputField) {
    let len = inputField.value.length;

    if(inputField.setSelectionRange) {
        inputField.focus();
        inputField.setSelectionRange(len, len);
    }
    else {
        let newRange = inputField.createTextRange();
        newRange.collapse(true);
        newRange.moveEnd('character', len);
        newRange.moveStart('character', len);
        newRange.select();
    }
}

todoInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        todoInputButton.click();
    }
})

todoList.addEventListener('click', e => {
    e.stopPropagation();
    const target = e.target;
    const targetElement = e.target.type;
    const targetTagName = e.target.localName;
    if(targetTagName == "input" && targetElement == "checkbox") {
        const nextTextField = target.nextElementSibling;
        if(target.checked) {
            target.setAttribute("checked", true);
            var thirdChild = nextTextField?.nextElementSibling;
            if(thirdChild.classList.contains("save-btn")) {
                nextTextField.value = nextTextField.defaultValue;
                nextTextField?.classList.remove("active");
                nextTextField?.setAttribute('readonly', true);
                nextTextField?.blur();
                thirdChild.classList.remove("save-btn");
                thirdChild.classList.add("edit-btn");
                thirdChild.innerHTML = `<img src="assets/edit.png" alt="File Edit">`;
                saveData();
            }
        }
        else {
            target.removeAttribute("checked");
        }
        nextTextField?.setAttribute('readonly', true);
        nextTextField?.classList.toggle("checked");
        nextTextField?.nextElementSibling?.classList.toggle("checked");
    }
    else if(targetTagName == "input" && targetElement == "text") {
    }
    else if(targetTagName == "button" && (target.classList.contains("edit-btn") || target.classList.contains("save-btn"))) {
        const previousTextField = target.previousElementSibling;
        if(target.classList.contains("edit-btn")) {
            previousTextField?.classList.add("active");
            previousTextField?.removeAttribute('readonly');
            target.classList.remove("edit-btn");
            target.classList.add("save-btn");
            target.innerHTML = `<img src="assets/done.png" alt="File Edit">`;
            putCursorAtTheEnd(previousTextField);
        }
        else if(target.classList.contains("save-btn")) {
            if(previousTextField.value != "") {
                previousTextField?.classList.remove("active");
                previousTextField.setAttribute("value", previousTextField.value);
                previousTextField?.setAttribute('readonly', true);
                previousTextField?.blur();
                target.classList.remove("save-btn");
                target.classList.add("edit-btn");
                target.innerHTML = `<img src="assets/edit.png" alt="File Edit">`;
            }
        }
    }
    else if(targetTagName == "button" && target.classList.contains("dlt-btn")) {
        target.parentElement.remove();
    }

    if(lastListItem != null) {
        if(!lastListItem.contains(e.target?.parentElement)) {
            resetLastItem(lastListItem);
        }
    }
    lastListItem = target.parentElement;
    saveData();
})

function saveData() {
    localStorage.setItem("data", todoList.innerHTML);
}

(function setData() {
    todoList.innerHTML += localStorage.getItem("data");
}());


function resetLastItem(lastListItem) {
    if(lastListItem != null) {
        let childList = Array.from(lastListItem.children);
        let [firstChild, secondChild, thirdChild, fourthChild] = childList;
        if(!firstChild?.checked) {
            if(thirdChild.classList.contains("save-btn")) {
                secondChild.value = secondChild?.defaultValue;
                secondChild?.classList.remove("active");
                secondChild?.setAttribute('readonly', true);
                secondChild?.blur();
                thirdChild.classList.remove("save-btn");
                thirdChild.classList.add("edit-btn");
                thirdChild.innerHTML = `<img src="assets/edit.png" alt="File Edit">`;
                saveData();
            }
        }
    }
    lastListItem = null;
}

window.addEventListener('click', e => {
    if(lastListItem != null) {
        if(!lastListItem.contains(e.target?.parentElement)) {
            resetLastItem(lastListItem);
        }
    }
})

window.onbeforeunload = e => {
    if(lastListItem != null) {
        if(!lastListItem.contains(e.target?.parentElement)) {
            resetLastItem(lastListItem);
        }
    }
}