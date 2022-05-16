window.addEventListener("load", () => {
  fetch("http://localhost:3000/files")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((file) => {
        const li = document.createElement("li");
        li.innerHTML = file;
        li.className += "list-item";
        li.onclick = () => {
          getMarkdown(file); // hecho en arrow function para que no se ejecute al instante
        };
        document.getElementById("list").appendChild(li);
      });
    });
});

const getMarkdown = (fileName) => {
  const url = "http://localhost:3000/getmarkdown";

  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName }),
  };
  fetch(url, req)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const textContainer = document.getElementById("text");
      textContainer.innerHTML = data.htmlText;
    });
};

const createTextArea = () => {
  const textContainer = document.getElementById("text");
  textContainer.innerHTML = ""; //formatear contenedor
  const form = document.createElement("form");
  form.id = "form";
  const inputName = document.createElement("input");
  inputName.id = "name";
  inputName.type = "text";
  inputName.placeholder = "Nombre del archivo";

  const textArea = document.createElement("textarea");

  textArea.id = "textArea";
  textArea.name = "textArea";
  textArea.placeholder = "Escribe aquí tu texto markdown";
  const button = document.createElement("button");
  button.id = "button-submit";
  button.type = "submit";
  button.innerHTML = "Enviar";
  form.onsubmit = (e) => {
    submitFile(e.target.name.value, e.target.textArea.value);
    e.preventDefault();
  };
  form.appendChild(inputName);
  form.appendChild(textArea);
  form.appendChild(button);
  textContainer.appendChild(form);
};
