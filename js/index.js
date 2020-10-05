const popboxBtn = document.querySelector(".table__button__popbox__on");
const popboxBlock = document.querySelector(".popbox");
const popboxClose = document.querySelector(".popbox__close");
const inputName = document.getElementsByName("name");
const form = document.querySelector("#userForm");
const inputs = document.querySelectorAll("input");
const submitForm = document.querySelector("#userForm");
const inputsArr = Array.from(inputs);
const tableCells = document.querySelectorAll(".table__navbar__cell");
const dateCell = document.querySelector("#registrationDate");
const deleteCell = document.querySelector("#deletePerson");
const editCell = document.querySelector("#editPerson");

let state = {
  form: [],
};
let objOfInputsValue = {};
// остановился на том, что нужно размэпить массив state.form и добавить
// каждому столбцу свое значение из ключа объекта в массиве state.form
function dateNow() {
  let date = new Date();
  console.log(date);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  console.log(year);
  console.log(month);
  console.log(day);
  return `${day.toString().length === 1 ? `0${day}` : day}.${
    (month + 1).toString().length === 1 ? `0${month + 1}` : month + 1
  }.${year}`;
}

const clearInputs = () => {
  inputs.forEach((el, index) => {
    if (el.className !== "popbox__submit") {
      el.value = "";
    }
  });
};
function addIdtoElement() {
  if (state.form.length > 0) {
    state.form.map((el, index) => {
      el.id = index;
    });
  }
}

function makeDeleteBtn(el) {
  let delBtn = document.createElement("button");
  delBtn.textContent = "x";
  delBtn.id = el.id;
  deleteCell.appendChild(delBtn);
  delBtn.addEventListener("click", (e) => {
    let id = e.target.id;
    state.form.forEach((el, index) => {
      el.id.toString() === id && state.form.splice(index, 1);
    });
    console.log(state);
    let nodesToDelete = document.querySelectorAll(".table__navbar__cell");
    let arrnodesToDelete = Array.from(nodesToDelete);
    let indexOfNode = el.id;
    arrnodesToDelete.forEach((el, index) => {
      let nodeToDelete = el;
      if (el.children.length > 0) {
        let p = Array.from(el.children);
        p.forEach((elP) => {
          elP.id === indexOfNode.toString() && nodeToDelete.removeChild(elP);
        });
      }
    });
    console.log(nodesToDelete);
  });
  console.log(state);
}

function addElementToTableCell() {
  state.form.map((el, index) => {
    if (state.form.length === 0 || el.id === state.form.length - 1) {
      for (key in el) {
        if (key !== "id" && key !== "name" && key !== "patronymic") {
          let tableCell = document.querySelector(`#${key}`);
          let pCell = document.createElement("p");
          if (key.toString() === "lastname") {
            pCell.textContent = `${el[key]} ${state.form[el.id].name.substr(
              0,
              1
            )}. ${state.form[el.id].patronymic.substr(0, 1)}.`;
            pCell.id = el.id;
            tableCell.appendChild(pCell);
          }
          if (key.toString() !== "lastname") {
            pCell.textContent = el[key];
            pCell.id = el.id;
            tableCell.appendChild(pCell);
          }
        }
      }
      let registrationDate = document.createElement("p");
      registrationDate.textContent = dateNow();
      registrationDate.id = el.id;
      dateCell.appendChild(registrationDate);
      makeDeleteBtn(el);
    }
  });
}

function listenersInit() {
  console.log(inputName);
  console.log(inputs);
  console.log(inputsArr);

  popboxBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popboxBlock.classList.remove("unvisible");
    console.log("ты включил форму");
  });
  popboxClose.addEventListener("click", (e) => {
    e.preventDefault();
    popboxBlock.classList.add("unvisible");
    console.log("ты выключил форму");
  });

  inputsArr.forEach((el, index) => {
    console.log(el);
    el.addEventListener("focus", (e) => {
      e.currentTarget.addEventListener("input", (e) => {
        console.log(e);

        objOfInputsValue[e.currentTarget.name] = e.currentTarget.value;

        console.log(objOfInputsValue);
      });
    });
  });

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (Object.keys(objOfInputsValue).length > 0) {
      state.form.push(objOfInputsValue);
      objOfInputsValue = {};
      clearInputs();
      console.log(objOfInputsValue);
      console.log(state);
      addIdtoElement();
      console.log(state);
      addElementToTableCell();
    }
  });

  if (state.form.length > 0) {
    let tableCellsArr = Array.from(tableCells);
    tableCellsArr.forEach((el, index) => {
      console.log(el);
    });
  }
  // form.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   console.log(form);
  //   console.log(new FormData(form));
  //   let response = await fetch("/article/formdata/post/user-avatar", {
  //     method: "POST",
  //     body: new FormData(form),
  //   });

  //   let result = await response.json();

  //   alert(result.message);
  // });
}

function init() {
  listenersInit();
}

window.onload = init();
