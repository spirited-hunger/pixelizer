import React from "react";
import "./App.css";
import { Home } from "./components/Home";
import Editor from "./components/Editor";
// import { Test } from "./components/Test";

// Important values
const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;

const PIXEL_SIZE = 15;

const MAX_COLOR_DISTANCE = 60;

let pixCount = 0;

class Color {
  rgbString: string;
  constructor(public r: number, public g: number, public b: number) {
    this.rgbString = `rgb(${r}, ${g}, ${b})`;
  }
}

class PaletteColor extends Color {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public index: number
  ) {
    super(r, g, b);
  }
}

type MyState = {
  fileURL: string;
  imageElement: HTMLImageElement | null;
  imageWidth: number;
  imageHeight: number;
  imageDirection: "landscape" | "portrait";
  dragDropMessage: string;
};

class App extends React.Component<{}, MyState, {}> {
  onUnmount = [] as (() => void)[];
  canvasMaxWidth: number = CANVAS_MAX_WIDTH;
  canvasMaxHeight: number = CANVAS_MAX_HEIGHT;

  constructor(props: any) {
    super(props);
    this.state = {
      fileURL: "",
      imageElement: null,
      imageWidth: 0,
      imageHeight: 0,
      imageDirection: "landscape",
      dragDropMessage: "Drag and drop your image to start",
    };
  }

  componentDidMount() {
    const onDragOver = (e: DragEvent): void => {
      e.preventDefault();
      this.setState({ dragDropMessage: "Release your image to upload" });
    };

    window.addEventListener("dragover", onDragOver);
    this.onUnmount.push(() => {
      window.removeEventListener("dragover", onDragOver);
    });

    const onDragLeave = (e: DragEvent): void => {
      e.preventDefault();
      this.setState({ dragDropMessage: "Drag and drop your image to start" });
    };

    window.addEventListener("dragleave", onDragLeave);
    this.onUnmount.push(() => {
      window.removeEventListener("dragleave", onDragLeave);
    });

    const onDrop = (e: DragEvent): void => {
      e.preventDefault();
      if (e.dataTransfer) {
        const file = e.dataTransfer.files[0];

        const fileType = file.type;
        const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

        if (validExtensions.includes(fileType)) {
          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            const originalImage = new Image();

            originalImage.src = `${fileReader.result}` as string;

            originalImage.onload = () => {
              const originalWidth = originalImage.width;
              const originalHeight = originalImage.height;

              const whRatio = originalWidth / originalHeight;

              let imageDirection: "landscape" | "portrait";
              let imageWidth: number;
              let imageHeight: number;
              if (whRatio >= 1) {
                /* width is bigger */
                imageDirection = "landscape";

                imageWidth = this.canvasMaxWidth;
                imageHeight = this.canvasMaxWidth / whRatio;
              } else {
                /* height is bigger */
                imageDirection = "portrait";

                imageWidth = this.canvasMaxHeight * whRatio;
                imageHeight = this.canvasMaxHeight;
              }

              // TODO 사이드이펙트 위험 (consider renaming)
              this.onUnmount.forEach((f) => f());

              this.setState({
                fileURL: `${fileReader.result}`,
                imageElement: originalImage,
                imageDirection: imageDirection,
                imageWidth: imageWidth,
                imageHeight: imageHeight,
              });
            };
          };
        } else {
          alert("Invalid file type");
          this.setState({
            dragDropMessage: "Drag and drop your image to start",
          });
        }
      }
    };

    window.addEventListener("drop", onDrop);
    this.onUnmount.push(() => {
      window.removeEventListener("drop", onDrop);
    });
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  handleFileUpload = (fileURL: string) => {
    this.setState({ fileURL: fileURL });
  };

  render() {
    return (
      <div>
        {this.state.fileURL === "" ||
        this.state.imageElement === null ||
        this.state.imageHeight === 0 ||
        this.state.imageWidth === 0 ? (
          <Home
            handleFileUpload={this.handleFileUpload}
            dragDropMessage={this.state.dragDropMessage}
          />
        ) : (
          <Editor
            fileURL={this.state.fileURL}
            imageElement={this.state.imageElement}
            imageWidth={this.state.imageWidth}
            imageHeight={this.state.imageHeight}
            imageDirection={this.state.imageDirection}
          />
        )}
      </div>
    );
  }
}

export default App;
