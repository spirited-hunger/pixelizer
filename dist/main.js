const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;
const PIXEL_SIZE = 30;
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.rgbString = `rgb(${r}, ${g}, ${b})`;
    }
}
;
let palette = [];
let imageWidth;
let imageHeight;
let colorFromImage = "linear-gradient(180deg, rgb(227,227,227) 0%, rgba(188,195,205) 100%)";
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
const paletteArea = document.querySelector(".palette-area");
let imgFile;
browseButton.onclick = () => {
    input.click();
};
pixelateButton.onclick = () => {
    if (imageWidth !== undefined && imageHeight !== undefined) {
        console.log("pix!");
        imgContext.fillStyle = "black";
        imgContext.fillRect(0, 0, imgCanvas.width, imgCanvas.height);
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
            const currentColor = new Color(r, g, b);
            imgContext.fillStyle = currentColor.rgbString;
            if (!palette.includes(currentColor)) {
                palette.push(currentColor);
            }
            imgContext.save();
            imgContext.translate(x, y);
            imgContext.fillRect(0, 0, pixelSize, pixelSize);
            imgContext.restore();
        }
    }
    showPalette();
};
input.addEventListener("change", (e) => {
    const input = e.target;
    imgFile = input.files[0];
    showFile();
});
dropArea.addEventListener("dragover", (e) => showReleaseMsg(e));
dropArea.addEventListener("dragleave", () => showUploadMsg());
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    imgFile = event.dataTransfer.files[0];
    showFile();
});
const showFile = () => {
    let fileType = imgFile.type;
    let validExtentsions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtentsions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imgFile);
        fileReader.onload = () => {
            activatePixelate(colorFromImage);
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
const showPalette = () => {
    palette.sort((c1, c2) => {
        const c1Brightness = calculateRelativeBrightnes(c1.r, c1.g, c1.b);
        const c2Brightness = calculateRelativeBrightnes(c2.r, c2.g, c2.b);
        return c2Brightness - c1Brightness;
    });
    for (let i = 0; i < palette.length; i++) {
        const paletteItem = document.createElement('div');
        paletteItem.classList.add("item");
        paletteItem.style.background = palette[i].rgbString;
        paletteArea.appendChild(paletteItem);
    }
};
const activatePixelate = (color) => {
    dropArea.classList.add("hidden");
    pixelateButton.classList.add("active");
    document.body.style.background = color;
    pixelateButton.style.background = color;
};
const calculateRelativeBrightnes = (red, green, blue) => {
    return Math.sqrt((red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114) / 100;
};
export {};
//# sourceMappingURL=main.js.map