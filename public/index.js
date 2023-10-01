const form = document.getElementById("form");
const responseDOM = document.getElementById("message");

async function uploadFiles() {
  const files = document.getElementById("files").files; // FileList
  //   console.log(files);
  const formData = new FormData();

  Object.keys(files).forEach((key) => {
    // console.log(files.item(key)); // individual file
    formData.append(files.item(key).name, files.item(key));
  });

  try {
    const response = await fetch("/upload", {
      method: "post",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  
    document.querySelector("input").value = "";
  
    if (response.status !== 200) {
      const msg = data.msg;
      responseDOM.innerHTML = `<p class="text-light">${msg}</p>`;
    } else {
      responseDOM.innerHTML = `<p class="text-light">Uploaded successfully. View your uploads:</p>`;
      Object.values(data)[2]
        .split(",")
        .forEach((imagePath) => {
          // console.log(imagePath);
          const pElem = document.createElement("p");
          const elem = document.createElement("a");
          elem.href = `${imagePath}`;
          elem.innerText = `${imagePath}`;
          pElem.appendChild(elem);
          responseDOM.appendChild(pElem);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  uploadFiles();
});
