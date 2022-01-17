// class App {
//   canvas: any;
//   ctx: any;
//   pixelRatio: number;
//   stageWidth: number;
//   stageHeight: number;

//   resize() {
//     this.stageWidth = document.body.clientWidth;
//     this.stageHeight = document.body.clientWidth;

//     this.canvas.width = this.stageWidth * this.pixelRatio;
//     this.canvas.height = this.stageHeight * this.pixelRatio;
//   };

//   animate() {

//   };

//   constructor() {
//     this.canvas = document.createElement('canvas');
//     document.body.appendChild(this.canvas);
//     this.ctx = this.canvas.getContext('2d');

//     this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

//     window.addEventListener('resize', this.resize.bind(this), false);

//     this.resize();

//     window.requestAnimationFrame(this.animate.bind(this));
//   }
// }

// window.onload = () => {
//   new App();
//   // console.log(devicePixelRatio)
// }

/* important values */
const CANVAS_MAX_WIDTH : number = 1080;
const CANVAS_MAX_HEIGHT : number = 1080;

const PIXEL_SIZE : number = 30;

class Color {
  rgbString: string;
  constructor(
    public r: number,
    public g: number,
    public b: number
  ) {
    this.rgbString = `rgb(${r}, ${g}, ${b})`;
  }
};

let palette : Color[] = []; // ! why?

let imageWidth: number;
let imageHeight: number;

let colorFromImage = "linear-gradient(180deg, rgb(227,227,227) 0%, rgba(188,195,205) 100%)";

/* selecting all required elements */

/* drop area */
const dropArea: HTMLElement = document.querySelector(".drag-area");
const dragText: HTMLElement = dropArea.querySelector("#drag-and-drop-msg");

/* button area */
const browseButton: HTMLButtonElement = dropArea.querySelector(".browseButton");
const pixelateButton: HTMLButtonElement = document.querySelector(".pixelateButton");
const input: HTMLInputElement = dropArea.querySelector("input");

/* image area */
const imgArea: HTMLElement = document.querySelector(".image-area");

const originalImage: HTMLImageElement = new Image();

const imgCanvas: HTMLCanvasElement = document.createElement('canvas');
const imgContext: any = imgCanvas.getContext('2d');

const pixCanvas: HTMLCanvasElement = document.createElement('canvas');
const pixContext: any = pixCanvas.getContext('2d');

/* palette area */
const paletteArea: HTMLDivElement = document.querySelector(".palette-area");

let imgFile : any;

browseButton.onclick = () => {
  input.click(); // if browseButton is clicked the input is also clicked
}

pixelateButton.onclick = () => {
  if (imageWidth !== undefined && imageHeight !== undefined) { // double-check if image is uploaded
    // TODO : consider delete this console log
    console.log("pix!");

    // deleting image with black
    imgContext.fillStyle = "black";
    imgContext.fillRect(0, 0, imgCanvas.width, imgCanvas.height);

    const pixelSize: number = PIXEL_SIZE;
    const pixelNumCol: number = Math.floor(imageWidth / pixelSize);
    const pixelNumRow: number = Math.floor(imageHeight / pixelSize);
    const pixNum: number = pixelNumCol * pixelNumRow;

    pixCanvas.width = pixelNumCol;
    pixCanvas.height = pixelNumRow;

    pixContext.drawImage(originalImage, 0, 0, pixelNumCol, pixelNumRow);
    /* getting pixelated data */
    const pixData = pixContext.getImageData(0, 0, pixelNumCol, pixelNumRow).data;

    for (let pixel = 0; pixel < pixNum; pixel++) {
      const col = pixel % pixelNumCol;
      const row = Math.floor(pixel / pixelNumCol);
      
      const x = col * pixelSize;
      const y = row * pixelSize;

      const r = pixData[pixel * 4 + 0];
      const g = pixData[pixel * 4 + 1];
      const b = pixData[pixel * 4 + 2];
      // const a = pixData[pixel * 4 + 3];

      // TODO : alpha value test
      // imgContext.globalAlpha = 0.8;

      const currentColor = new Color(r, g, b);
      
      imgContext.fillStyle = currentColor.rgbString;

      // adding color in the palette if new
      if (!palette.includes(currentColor)) {
        palette.push(currentColor);
      }

      imgContext.save();
      imgContext.translate(x, y);
      
      // ? Rectangle pixels
      imgContext.fillRect(0, 0, pixelSize, pixelSize);

      // ? Circle pixels
      // imgContext.translate(pixelSize * 0.5, pixelSize * 0.5);
      // imgContext.beginPath();
      // imgContext.arc(0, 0, pixelSize * 0.5, 0, Math.PI * 2);
      // imgContext.fill();

      imgContext.restore();
    }
  }

  showPalette();
}

input.addEventListener("change", (e:Event) : void => {
  const input = (e.target as HTMLInputElement)

  // getting user select file and [0] means if a user selets multiple files we'll select only the first one
  imgFile = input.files[0];
  // ! if use this.files[0], "this" points to window because it is an arrow function
  showFile();
})

// if user drag file over image area
dropArea.addEventListener("dragover", (e) => showReleaseMsg(e));

// if user leave dragged file from image area
dropArea.addEventListener("dragleave", () => showUploadMsg())

// if user drop file on drag area
dropArea.addEventListener("drop", (event : any) : void => {
  event.preventDefault(); // preventing from default behaviour (opening a new tab)
  // console.log("File is dropped on drop area");

  // getting user select file and [0] means if a user selets multiple files we'll select only the first one
  imgFile = event.dataTransfer.files[0];
  // console.log(imgFile);
  showFile();
})

const showFile = () => {
  let fileType = imgFile.type;
  let validExtentsions: string[] = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtentsions.includes(fileType)) {
    let fileReader: FileReader = new FileReader();
    
    fileReader.readAsDataURL(imgFile);
    
    fileReader.onload = () => {
      activatePixelate(colorFromImage);

      let imageURL: string = `${fileReader.result}`;
      // console.log(imageURL); // this is a base64 format
      originalImage.src = imageURL;

      originalImage.addEventListener('load', () => {
        imgArea.appendChild(imgCanvas);

        /* adjusting image size to the canvas size */
        imageWidth = originalImage.width;
        imageHeight = originalImage.height;
        const whRatio: number = imageWidth / imageHeight;
        if (whRatio >= 1) {
          /* width is bigger */
          imageWidth = CANVAS_MAX_WIDTH;
          imageHeight = imageWidth / whRatio;
        } else {
          /* height is bigger */
          imageHeight = CANVAS_MAX_HEIGHT;
          imageWidth = imageHeight * whRatio;
        }

        /* fitting canvas size to image size */
        imgCanvas.width = imageWidth;
        imgCanvas.height = imageHeight;

        /* drawing the image on canvas */        
        imgContext.drawImage(originalImage, 0, 0, imageWidth, imageHeight);

        /* hide drop area */
        dropArea.classList.add("hidden");
      });
    }
  } else {
    alert("This is not a valid image file");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

const showReleaseMsg = (event : any) : void => {
  event.preventDefault(); // preventing from default behaviour
  // console.log("File is on drop area");
  dropArea.classList.add("active");
  dragText.textContent = "Release to upload file";
};

const showUploadMsg = () : void => {
  // console.log("File is outside from drop area");
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
};

const showPalette = () : void => {
  // sort by brightness
  palette.sort((c1: Color, c2: Color) => {
    const c1Brightness = calculateRelativeBrightnes(c1.r, c1.g, c1.b);
    const c2Brightness = calculateRelativeBrightnes(c2.r, c2.g, c2.b);
    return c2Brightness - c1Brightness;
  })

  for(let i = 0; i < palette.length; i++) {
    const paletteItem = document.createElement('div');
    paletteItem.classList.add("item");
    paletteItem.style.background = palette[i].rgbString;
    paletteArea.appendChild(paletteItem);
  }
};

const activatePixelate = (color: string) : void => {
  dropArea.classList.add("hidden");
  
  pixelateButton.classList.add("active");
  document.body.style.background = color;
  pixelateButton.style.background = color;
};

/* 
Human eyes do not percieve red green and blue the same.
need different amount of brightness for red green blue respectively 

This utility function will adjust each values of rgb to a visually accurate brightness value for human perception
*/
const calculateRelativeBrightnes = (red: number, green: number, blue: number) : number => {
  return Math.sqrt(
    (red * red) * 0.299 +
    (green * green) * 0.587 +
    (blue * blue) * 0.114
  )/100;
};

// 모듈임을 알려준다.
export {};
