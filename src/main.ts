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
const CANVAS_WIDTH : number = 1080;
const CANVAS_HEIGHT : number = 1080;

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

let file : any;

browseButton.onclick = () => {
  input.click(); // if browseButton is clicked the input is also clicked
}

pixelateButton.onclick = () => {
  file
}

input.addEventListener("change", (e:Event) : void => {
  const input = (e.target as HTMLInputElement)

  // getting user select file and [0] means if a user selets multiple files we'll select only the first one
  file = input.files[0];
  // ! if use this.files[0], "this" points to window because it is an arrow function
  showFile();

  dropArea.classList.add("active");
  
  pixelateButton.classList.add("active");
})

// if user drag file over drag area
dropArea.addEventListener("dragover", (event : any) : void => {
  event.preventDefault(); // preventing from default behaviour
  // console.log("File is on drop area");
  dropArea.classList.add("active");
  dragText.textContent = "Release to upload file";
})

// if user leave dragged file from drag area
dropArea.addEventListener("dragleave", () => {
  // console.log("File is outside from drop area");
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
})

// if user drop file on drag area
dropArea.addEventListener("drop", (event : any) : void => {
  event.preventDefault(); // preventing from default behaviour (opening a new tab)
  // console.log("File is dropped on drop area");

  // getting user select file and [0] means if a user selets multiple files we'll select only the first one
  file = event.dataTransfer.files[0];
  // console.log(file);
  showFile();
})

const showFile = () => {
  let fileType = file.type;
  let validExtentsions: Array<string> = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtentsions.includes(fileType)) {
    let fileReader: FileReader = new FileReader();
    
    fileReader.readAsDataURL(file);
    
    fileReader.onload = () => {
      const originalImage = new Image();
      
      let imageURL: string = `${fileReader.result}`;
      // console.log(imageURL); // this is a base64 format
      originalImage.src = imageURL;

      originalImage.addEventListener('load', () => {
        const originalCanvas: HTMLCanvasElement = document.createElement('canvas');

        imgArea.appendChild(originalCanvas);
        
        originalCanvas.width = CANVAS_WIDTH;
        originalCanvas.height = CANVAS_HEIGHT;
        
        const originalContext: any = originalCanvas.getContext('2d');

        /* adjusting image size to the frame size */
        let imageWidth: number = originalImage.width;
        let imageHeight: number = originalImage.height;

        const whRatio: number = imageWidth / imageHeight;

        if (whRatio >= 1) {
          /* width is bigger */
          imageWidth = CANVAS_WIDTH;
          imageHeight = imageWidth / whRatio;
        } else {
          /* height is bigger */
          imageHeight = CANVAS_HEIGHT;
          imageWidth = imageHeight * whRatio;
        }

        /* centering the image on canvas */
        let x: number = (CANVAS_WIDTH / 2) - (imageWidth / 2);
        let y: number = (CANVAS_HEIGHT / 2) - (imageHeight / 2);
        let w: number = imageWidth;
        let h: number = imageHeight;
        
        originalContext.drawImage(originalImage, x, y, w, h);
      });
    }
  } else {
    alert("This is not a valid image file");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// 모듈임을 알려준다.
export {};
