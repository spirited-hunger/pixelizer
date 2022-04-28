import React from "react";
import "./App.css";
import { Home } from "./components/Home";
import Editor from "./components/Editor";
import { PixConst } from "./AppConst";
import { resizeImage } from "./ImageResize";
// import { Test } from "./components/Test";

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
  imageURL: string;
  imageElement: HTMLImageElement | null;
  imagePXWidth: number;
  imagePXHeight: number;
  imageCSSWidth: number;
  imageCSSHeight: number;
  imageDirection: "landscape" | "portrait";
  dragDropMessage: string;
};

class App extends React.Component<{}, MyState, {}> {
  onUnmount = [] as (() => void)[];
  canvasMaxPXLength: number = PixConst.CANVAS_MAX_PX_LENGTH;
  convasMaxCSSLength: number = PixConst.CANVAS_MAX_CSS_LENGTH;

  constructor(props: any) {
    super(props);
    this.state = {
      imageURL: "",
      imageElement: null,
      imagePXWidth: 0,
      imagePXHeight: 0,
      imageCSSWidth: 0,
      imageCSSHeight: 0,
      imageDirection: "landscape",
      dragDropMessage: "Drag and drop your image to start",
    };
  }

  showFile(file: File) {
    const fileType = file.type;

    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)) {
      resizeImage(
        file,
        this.canvasMaxPXLength,
        this.convasMaxCSSLength
      ).then((d) => {
        this.setState(d);
      });

      // TODO 사이드이펙트 위험 (consider renaming)
      // 드래그드랍 이벤트 리스너 제거
      this.onUnmount.forEach((f) => f());
    } else {
      alert("Invalid file type");
      this.setState({
        dragDropMessage: "Drag and drop your image to start",
      });
    }
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

        this.showFile(file);
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

  handleFileUpload = (file: File) => {
    this.showFile(file);
  };

  render() {
    return (
      <div>
        {this.state.imageURL === "" ||
        this.state.imageElement === null ||
        this.state.imagePXHeight === 0 ||
        this.state.imagePXWidth === 0 ? (
          <Home
            handleFileUpload={this.handleFileUpload}
            dragDropMessage={this.state.dragDropMessage}
          />
        ) : (
          <Editor
            imageURL={this.state.imageURL}
            imageElement={this.state.imageElement}
            imagePXWidth={this.state.imagePXWidth}
            imagePXHeight={this.state.imagePXHeight}
            imageCSSWidth={`${this.state.imageCSSWidth}px`}
            imageCSSHeight={`${this.state.imageCSSHeight}px`}
            imageDirection={this.state.imageDirection}
          />
        )}
      </div>
    );
  }
}

export default App;
