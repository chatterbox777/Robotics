const popboxBtn = document.querySelector(".table__button__popbox__on");
const popboxBlock = document.querySelector(".popbox");
const popboxClose = document.querySelector(".popbox__close");
const inputName = document.getElementsByName("name");
const form = document.querySelector("#userForm");
const inputs = document.querySelectorAll("input");
const submitForm = document.querySelector("#userForm");
const inputsArr = Array.from(inputs);
const tableCells = document.querySelectorAll(".table__navbar__cell");

let state = {
  form: [],
};
let objOfInputsValue = {};
// остановился на том, что нужно размэпить массив state.form и добавить
// каждому столбцу свое значение из ключа объекта в массиве state.form

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
function addElementToTableCell() {
  state.form.map((el, index) => {
    if (state.form.length === 0 || el.id === state.form.length - 1) {
      for (key in el) {
        if (key !== "id") {
          let tableCell = document.querySelector(`#${key}`);
          let pCell = document.createElement("p");
          pCell.textContent = el[key];
          tableCell.appendChild(pCell);
        }
      }
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
      e.currentTarget.addEventListener("change", (e) => {
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
