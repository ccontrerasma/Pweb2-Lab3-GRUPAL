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
