const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;
const PIXEL_SIZE = 10;
const MAX_COLOR_DIST = 40;
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.rgbString = `rgb(${r}, ${g}, ${b})`;
    }
}
;
class PaletteColor extends Color {
    constructor(r, g, b, index) {
        super(r, g, b);
        this.r = r;
        this.g = g;
        this.b = b;
        this.index = index;
    }
}
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
        const pixMatrix = [];
        for (let i = 0; i < pixelNumRow; i++) {
            pixMatrix.push([]);
        }
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
            const r = pixData[pixel * 4 + 0];
            const g = pixData[pixel * 4 + 1];
            const b = pixData[pixel * 4 + 2];
            let currentColor = new Color(r, g, b);
            if (palette.length === 0) {
                const newPaletteColor = new PaletteColor(currentColor.r, currentColor.g, currentColor.b, palette.length);
                palette.push(newPaletteColor);
            }
            else {
                const paletteLength = palette.length;
                let thereIsSimilarColor = false;
                let similarColorIdx = 0;
                for (let j = 0; j < paletteLength; j++) {
                    const pr = palette[j].r;
                    const pg = palette[j].g;
                    const pb = palette[j].b;
                    const cr = currentColor.r;
                    const cg = currentColor.g;
                    const cb = currentColor.b;
                    const redDiff = cr - pr;
                    const greenDiff = cg - pg;
                    const blueDiff = cb - pb;
                    const redComp = (cr + pr) * 0.5;
                    const colorDist = Math.sqrt((2 + redComp / 256) * redDiff * redDiff +
                        4 * greenDiff * greenDiff +
                        (2 + ((255 - redDiff) / 256)) * blueDiff * blueDiff);
                    if (colorDist < MAX_COLOR_DIST) {
                        thereIsSimilarColor = true;
                        similarColorIdx = j;
                        break;
                    }
                    else {
                        thereIsSimilarColor = false;
                    }
                }
                if (!thereIsSimilarColor) {
                    const newPaletteColor = new PaletteColor(currentColor.r, currentColor.g, currentColor.b, palette.length);
                    palette.push(newPaletteColor);
                    pixMatrix[row].push(palette.length - 1);
                }
                else {
                    pixMatrix[row].push(similarColorIdx);
                }
                imgContext.restore();
            }
        }
        for (let i = 0; i < palette.length; i++) {
            let pr = palette[i].r;
            let pg = palette[i].g;
            let pb = palette[i].b;
            const pBrightness = Math.floor(Math.sqrt((pr * pr) * 0.299 +
                (pg * pg) * 0.587 +
                (pb * pb) * 0.114));
            if (pBrightness > 241) {
                pr = 241;
                pg = 241;
                pb = 241;
            }
            else if (pBrightness < 15) {
                pr = 30;
                pg = 31;
                pb = 33;
            }
            else if (pBrightness < 127) {
                pg = pg * (-0.005 * pBrightness + 1.57);
                pb = pb * (-0.005 * pBrightness + 1.57);
            }
            else if (pBrightness >= 127) {
                pr = pr * (0.004 * pBrightness + 1.56);
            }
            palette[i].r = pr;
            palette[i].g = pg;
            palette[i].b = pb;
            palette[i].rgbString = `rgb(${pr}, ${pg}, ${pb})`;
        }
        for (let row = 0; row < pixMatrix.length; row++) {
            for (let col = 0; col < pixMatrix[row].length; col++) {
                const x = col * pixelSize;
                const y = row * pixelSize;
                resultContext.save();
                resultContext.translate(x, y);
                resultContext.fillStyle = palette[pixMatrix[row][col]].rgbString;
                resultContext.fillRect(0, 0, pixelSize, pixelSize);
                imgContext.restore();
            }
        }
    }
    showPalette();
    console.log(palette);
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
    const sortedPalette = palette.slice(0);
    sortedPalette.sort((c1, c2) => {
        const c1Brightness = calculate.relativeBrightness(c1.r, c1.g, c1.b);
        const c2Brightness = calculate.relativeBrightness(c2.r, c2.g, c2.b);
        return c2Brightness - c1Brightness;
    });
    for (let i = 0; i < palette.length; i++) {
        const paletteItem = document.createElement('div');
        paletteItem.classList.add("item");
        paletteItem.style.background = sortedPalette[i].rgbString;
        paletteArea.appendChild(paletteItem);
        paletteItem.addEventListener('click', () => {
        });
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