const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;
const PIXEL_SIZE = 10;
let imageWidth;
let imageHeight;
let imagePalette = "linear-gradient(180deg, #E3E3E3 0%, #BCC3CD 100%)";
const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("#drag-and-drop-msg");
const browseButton = dropArea.querySelector(".browseButton");
const pixelateButton = document.querySelector(".pixelateButton");
const input = dropArea.querySelector("input");
const imgArea = document.querySelector(".image-area");
const originalImage = new Image();
const imgCanvas = document.createElement('canvas');
const imgContext = imgCanvas.getContext('2d');
const pixCanvas = document.createElement('canvas');
const pixContext = pixCanvas.getContext('2d');
let file;
browseButton.onclick = () => {
    input.click();
};
pixelateButton.onclick = () => {
    if (imageWidth !== undefined && imageHeight !== undefined) {
        console.log("pix!");
        const pixelSize = PIXEL_SIZE;
        const pixelNumCol = Math.floor(imageWidth / pixelSize);
        const pixelNumRow = Math.floor(imageHeight / pixelSize);
        const pixNum = pixelNumCol * pixelNumRow;
        pixCanvas.width = pixelNumCol;
        pixCanvas.height = pixelNumRow;
        pixContext.drawImage(originalImage, 0, 0, pixelNumCol, pixelNumRow);
        const pixData = pixContext.getImageData(0, 0, pixelNumCol, pixelNumRow).data;
        for (let pixel = 0; pixel < pixNum; pixel++) {
            const col = pixel % pixelNumCol;
            const row = Math.floor(pixel / pixelNumCol);
            const x = col * pixelSize;
            const y = row * pixelSize;
            const r = pixData[pixel * 4 + 0];
            const g = pixData[pixel * 4 + 1];
            const b = pixData[pixel * 4 + 2];
            const a = pixData[pixel * 4 + 3];
            imgContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
            imgContext.save();
            imgContext.translate(x, y);
            imgContext.fillRect(0, 0, pixelSize, pixelSize);
            imgContext.fill();
            imgContext.restore();
        }
    }
};
input.addEventListener("change", (e) => {
    const input = e.target;
    file = input.files[0];
    showFile();
});
dropArea.addEventListener("dragover", (e) => showReleaseMsg(e));
dropArea.addEventListener("dragleave", () => showUploadMsg());
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
            activatePixelate(imagePalette);
            let imageURL = `${fileReader.result}`;
            originalImage.src = imageURL;
            originalImage.addEventListener('load', () => {
                imgArea.appendChild(imgCanvas);
                imageWidth = originalImage.width;
                imageHeight = originalImage.height;
                const whRatio = imageWidth / imageHeight;
                if (whRatio >= 1) {
                    imageWidth = CANVAS_MAX_WIDTH;
                    imageHeight = imageWidth / whRatio;
                }
                else {
                    imageHeight = CANVAS_MAX_HEIGHT;
                    imageWidth = imageHeight * whRatio;
                }
                imgCanvas.width = imageWidth;
                imgCanvas.height = imageHeight;
                imgContext.drawImage(originalImage, 0, 0, imageWidth, imageHeight);
                dropArea.classList.add("hidden");
            });
        };
    }
    else {
        alert("This is not a valid image file");
        dragText.textContent = "Drag & Drop to Upload File";
    }
};
const showReleaseMsg = (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload file";
};
const showUploadMsg = () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
};
const activatePixelate = (color) => {
    dropArea.classList.add("hidden");
    pixelateButton.classList.add("active");
    document.body.style.background = color;
    pixelateButton.style.background = color;
};
export {};
//# sourceMappingURL=main.js.map