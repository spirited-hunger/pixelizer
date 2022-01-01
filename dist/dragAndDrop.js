// selecting all required elements
var dropArea = document.querySelector(".drag-area");
var dragText = dropArea.querySelector("h1");
var file;
// if user drag file over drag area
dropArea.addEventListener("dragover", function (event) {
    event.preventDefault(); // preventing from default behaviour
    // console.log("File is on drop area");
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload file";
});
// if user leave dragged file from drag area
dropArea.addEventListener("dragleave", function () {
    // console.log("File is outside from drop area");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
// if user drop file on drag area
dropArea.addEventListener("drop", function (event) {
    event.preventDefault(); // preventing from default behaviour (opening a new tab)
    // console.log("File is dropped on drop area");
    // getting user select file and [0] means if a user selets multiple files we'll select only the first one
    file = event.dataTransfer.files[0];
    var fileType = file.type;
    // console.log(file);
    var validExtentsions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtentsions.includes(fileType)) {
        var fileReader_1 = new FileReader();
        fileReader_1.onload = function () {
            var fileURL = fileReader_1.result;
            console.log(fileURL); // base64
            var imgTag = "<img src=\"".concat(fileURL, "\" alt=\"\">");
            dropArea.innerHTML = imgTag;
        };
        fileReader_1.readAsDataURL(file);
    }
    else {
        alert("This is not a valid image file");
    }
});
//# sourceMappingURL=dragAndDrop.js.map