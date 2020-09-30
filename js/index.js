let state = {
  form: {
    name: "",
    lastName: "",
    birthdate: "",
    birthplace: "",
    mail: "",
    phoneNumber: "",
    registrationDate: "",
    lastSeen: "",
  },
};

function listenersInit() {
  const popboxBtn = document.querySelector(".table__button__popbox__on");
  const popboxBlock = document.querySelector(".popbox");
  const popboxClose = document.querySelector(".popbox__close");
  const inputName = document.getElementsByName("name");
  const form = document.querySelector("#userForm");
  const inputs = document.querySelectorAll("input");
  const inputSubmitForm = document.querySelector(".popbox__submit");
  console.log(inputName);
  console.log(inputs);

  const clearInputs = () => {
    inputs.forEach((el, index) => {
      el.value = "";
    });
  };

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
  inputs.forEach((el, index) => {
    el.addEventListener("change", (e) => {
      e.preventDefault();
      console.log(e);
      textToState(e.target.name, e.target.value);
    });
  });
  let textToState = (idCell, text) => {
    inputSubmitForm.addEventListener("click", (e) => {
      e.preventDefault();
      let neededCell = document.querySelector(`#${idCell}`);
      let pCell = document.createElement("p");
      pCell.textContent = text;
      neededCell.appendChild(pCell);
    });
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(form);
    console.log(new FormData(form));
    let response = await fetch("/article/formdata/post/user-avatar", {
      method: "POST",
      body: new FormData(form),
    });

    let result = await response.json();

    alert(result.message);
  });
}

function init() {
  listenersInit();
}

window.onload = init();
