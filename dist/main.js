const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;
const PIXEL_SIZE = 100;
const MAX_COLOR_DIST = 150;
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
const imgCanvas = document.createElement('canvas');
const imgContext = imgCanvas.getContext('2d');
const pixCanvas = document.createElement('canvas');
const pixContext = pixCanvas.getContext('2d');
const resultCanvas = document.createElement('canvas');
const resultContext = imgCanvas.getContext('2d');
const paletteArea = document.querySelector(".palette-area");
let imgFile;
browseButton.addEventListener("click", () => {
    input.click();
});
input.addEventListener("change", (e) => {
    const input = e.target;
    imgFile = input.files[0];
    showFile();
});
dropArea.addEventListener("dragover", (e) => showReleaseMsg(e));
dropArea.addEventListener("dragleave", () => showUploadMsg());
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    imgFile = e.dataTransfer.files[0];
    showFile();
});
pixelateButton.addEventListener("click", () => {
    if (imageWidth !== undefined && imageHeight !== undefined) {
        console.log("pix!");
        const pixelSize = PIXEL_SIZE;
        const pixelNumCol = Math.floor(imageWidth / pixelSize);
        const pixelNumRow = Math.floor(imageHeight / pixelSize);
        const pixNum = pixelNumCol * pixelNumRow;
        pixCanvas.width = pixelNumCol;
        pixCanvas.height = pixelNumRow;
        pixContext.drawImage(imgCanvas, 0, 0, pixelNumCol, pixelNumRow);
        resultContext.width = imgCanvas.width;
        resultContext.height = imgCanvas.height;
        resultContext.fillStyle = "black";
        resultContext.fillRect(0, 0, imgCanvas.width, imgCanvas.height);
        imgArea.appendChild(resultCanvas);
        const pixData = pixContext.getImageData(0, 0, pixelNumCol, pixelNumRow).data;
        for (let pixel = 0; pixel < pixNum; pixel++) {
            const col = pixel % pixelNumCol;
            const row = Math.floor(pixel / pixelNumCol);
            const x = col * pixelSize;
            const y = row * pixelSize;
            const r = pixData[pixel * 4 + 0];
            const g = pixData[pixel * 4 + 1];
            const b = pixData[pixel * 4 + 2];
            let currentColor = new Color(r, g, b);
            if (palette.length === 0) {
                palette.push(currentColor);
            }
            else {
                const paletteLength = palette.length;
                for (let i = 0; i < paletteLength; i++) {
                    const pr = palette[i].r;
                    const pg = palette[i].g;
                    const pb = palette[i].b;
                    const cr = currentColor.r;
                    const cg = currentColor.g;
                    const cb = currentColor.b;
                    const colorDist = Math.sqrt((pr - cr) ** 2 + (pg - cg) ** 2 + (pb - cb) ** 2);
                    if (colorDist < MAX_COLOR_DIST) {
                        palette[i].r = (pr + cr) * 0.5;
                        palette[i].g = (pg + cg) * 0.5;
                        palette[i].b = (pb + cb) * 0.5;
                        break;
                    }
                    else {
                        palette.push(currentColor);
                    }
                }
            }
            resultContext.save();
            resultContext.translate(x, y);
            resultContext.fillStyle = currentColor.rgbString;
            resultContext.fillRect(0, 0, pixelSize, pixelSize);
            imgContext.restore();
        }
    }
    showPalette();
});
const showFile = () => {
    let fileType = imgFile.type;
    let validExtentsions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtentsions.includes(fileType)) {
        const originalImage = new Image();
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
                const imageCSSWH = Number(window.getComputedStyle(imgCanvas).width.split("px")[0]);
                imgCanvas.style.width = `${Math.floor(imageWidth * imageCSSWH / CANVAS_MAX_WIDTH)}px`;
                imgCanvas.style.height = `${Math.floor(imageHeight * imageCSSWH / CANVAS_MAX_HEIGHT)}px`;
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
const showPalette = async () => {
    const calculate = await import("./functions/calculate.js");
    palette.sort((c1, c2) => {
        const c1Brightness = calculate.relativeBrightness(c1.r, c1.g, c1.b);
        const c2Brightness = calculate.relativeBrightness(c2.r, c2.g, c2.b);
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
export {};
//# sourceMappingURL=main.js.map