const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1080;
const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("#drag-and-drop-msg");
const browseButton = dropArea.querySelector(".browseButton");
const pixelateButton = document.querySelector(".pixelateButton");
const input = dropArea.querySelector("input");
const imgArea = document.querySelector(".image-area");
let file;
browseButton.onclick = () => {
    input.click();
};
pixelateButton.onclick = () => {
    file;
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
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const originalImage = new Image();
            let imageURL = `${fileReader.result}`;
            originalImage.src = imageURL;
            originalImage.addEventListener('load', () => {
                const originalCanvas = document.createElement('canvas');
                imgArea.appendChild(originalCanvas);
                originalCanvas.width = CANVAS_WIDTH;
                originalCanvas.height = CANVAS_HEIGHT;
                const originalContext = originalCanvas.getContext('2d');
                let imageWidth = originalImage.width;
                let imageHeight = originalImage.height;
                const whRatio = imageWidth / imageHeight;
                if (whRatio >= 1) {
                    imageWidth = CANVAS_WIDTH;
                    imageHeight = imageWidth / whRatio;
                }
                else {
                    imageHeight = CANVAS_HEIGHT;
                    imageWidth = imageHeight * whRatio;
                }
                let x = (CANVAS_WIDTH / 2) - (imageWidth / 2);
                let y = (CANVAS_HEIGHT / 2) - (imageHeight / 2);
                let w = imageWidth;
                let h = imageHeight;
                originalContext.drawImage(originalImage, x, y, w, h);
            });
        };
    }
    else {
        alert("This is not a valid image file");
        dragText.textContent = "Drag & Drop to Upload File";
    }
};
export {};
//# sourceMappingURL=main.js.map