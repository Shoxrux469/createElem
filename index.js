let form = document.forms.todo;
let inp = form.querySelector("input");
let container = document.querySelector(".container");
let base_url = "http://localhost:8080";

let todos = [
  {
    id: Math.random(),
    title: "fjkdnsfljsdnf",
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    isDone: true,
  },
  {
    id: Math.random(),
    title: "task 2",
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    isDone: false,
  },
];


 form.onsubmit = (e) => {q
  e.preventDefault();
  console.log(todos);
  let todo = {
	id: Math.random(),
    title: inp.value,
	surname: "Miraxmedov",
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    isDone: false,
  };
  fetch(base_url + "/users", {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res, container));

  todos.push(todo);
  reload(todos);
};

reload(todos);

function reload(arr, place) {
	container.innerHTML = ''
	  
  for (let item of arr) {
    // a
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDiv");
    let topDiv = document.createElement("div");
    let title = document.createElement("span");
    let removeBtn = document.createElement("button");
    let timeSpan = document.createElement("span");
    let change = document.querySelector(".change");
    let box = document.querySelector(".box");
    let inp = document.querySelector(".inp");
    let cancel = document.querySelector(".cancel");

    // b
    title.classList.toggle("done", item.isDone);

    mainDiv.classList.add("item");
    topDiv.classList.add("top");
    timeSpan.classList.add("time");

    title.innerHTML = item.title;
    removeBtn.innerHTML = "x";
    timeSpan.innerHTML = item.time;

    // c
    mainDiv.append(topDiv, timeSpan);
    topDiv.append(title, removeBtn);
    container.append(mainDiv);

    // d
    title.onclick = () => {
      item.isDone = !item.isDone;

      title.classList.toggle("done", item.isDone);
    };

    mainDiv.ondblclick = () => {
      inp.value = title.innerHTML;
      box.classList.add("active");
      change.onclick = () => {
        item.title = inp.value;
        title.innerHTML = item.title;
      };
      document.onkeyup = (e) => {
        if (e.keyCode === 13) {
          item.title = inp.value;
          title.innerHTML = item.title;
        }
      };
      cancel.onclick = () => {
        box.classList.remove("active");
        inp.value = "";	
      };
      document.onkeydown = (e) => {
        if (e.keyCode === 27) {
          box.classList.remove("active");
          inp.value = "";
        }
      };
    };
  }
}
document.onkeyup = (e) => {
  console.log(e.keyCode);
};