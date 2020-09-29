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
  console.log(inputName);
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
  inputName[0].addEventListener("change", (e) => {
    e.preventDefault();
    state.form.name = e.target.value;
    console.log(state.form.name);
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
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
