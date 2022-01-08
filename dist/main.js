const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("h2");
const browseButton = dropArea.querySelector(".browseButton");
const pixelateButton = document.querySelector(".pixelateButton");
const input = dropArea.querySelector("input");
let file;
browseButton.onclick = () => {
    input.click();
};
input.addEventListener("change", (e) => {
    const input = e.target;
    file = input.files[0];
    showFile();
    dropArea.classList.add("active");
    pixelateButton.classList.add("active");
});
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload file";
});
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
});
const showFile = () => {
    let fileType = file.type;
    let validExtentsions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtentsions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    }
    else {
        alert("This is not a valid image file");
        dragText.textContent = "Drag & Drop to Upload File";
    }
};
export {};
//# sourceMappingURL=main.js.map