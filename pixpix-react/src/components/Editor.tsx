import React from "react";
import { MenuButton } from "./editor_components/MenuButton";

type MyProps = {
  imageURL: string; // unidefined 인 경우 프롭에 오지 않음
  imageElement: HTMLImageElement;
  imagePXWidth: number;
  imagePXHeight: number;
  imageCSSWidth: string;
  imageCSSHeight: string;
  imageDirection: "landscape" | "portrait";
};

type MyState = {};

class Editor extends React.Component<MyProps, MyState> {
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
  pixCanvasRef: React.RefObject<HTMLCanvasElement>;
  resultCanvasRef: React.RefObject<HTMLCanvasElement>;
  gridCanvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: MyProps) {
    super(props);
    this.state = {};
    this.imageCanvasRef = React.createRef();
    this.pixCanvasRef = React.createRef();
    this.resultCanvasRef = React.createRef();
    this.gridCanvasRef = React.createRef();
  }
  onUnmount = [] as (() => void)[];

  componentDidMount() {
    const imageCanvas = this.imageCanvasRef.current;
    const imageContext = imageCanvas?.getContext("2d");

    imageContext?.drawImage(
      this.props.imageElement,
      0,
      0,
      this.props.imagePXWidth,
      this.props.imagePXHeight
    );
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  render() {
    return (
      <div className="main-area bg-gradient-to-b from-blue-grey to-smooth-grey border-none grid grid-cols-[1fr_6fr] auto-rows-[100vh]">
        <div className="nav-area bg-dark-grey min-w-[300px] grid grid-rows-[1fr_5fr_1fr] auto-rows-[minmax(100px, auto)]">
          <div className="logo-area min-h-[150px] flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-2">
            PIXPIX
          </div>
          <div className="menu-area flex flex-col justify-end items-stretch col-start-1 col-end-2 row-start-2 row-end-3">
            <MenuButton buttonName={"open image"} />
            <MenuButton buttonName={"reset image"} />
            <MenuButton buttonName={"save image"} />
            <MenuButton buttonName={"share image"} />
          </div>
          <div className="github-area flex justify-center items-center col-start-1 col-end-2 row-start-3 row-end-4 min-h-[150px]">
            Github
          </div>
        </div>
        <div className="editor-area flex bg-[#eee] justify-center items-center overflow-x-auto overflow-y-auto">
          <div className="pixarea flex-[0_0_1200px] h-[900px] w-[1200px] grid grid-cols-[repeat(4,_1fr)] grid-rows-[repeat(12,_1fr)] gap-[10px]">
            <div className="image-area row-[1/13] col-[1/4] flex flex-col">
              <div className="image-bar flex-[0_0_30px] border-4 border-dark-line"></div>
              <div className="image-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line flex justify-center items-center">
                <canvas
                  className={`image-canvas border-4 border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]`}
                  ref={this.imageCanvasRef}
                  width={this.props.imagePXWidth}
                  height={this.props.imagePXHeight}
                  style={{
                    width: `${this.props.imageCSSWidth}`,
                    height: `${this.props.imageCSSHeight}`,
                  }}
                ></canvas>
                <canvas
                  className="pix-canvas border-4 border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
                  ref={this.pixCanvasRef}
                  width={this.props.imagePXWidth}
                  height={this.props.imagePXHeight}
                  style={{
                    width: `${this.props.imageCSSWidth}`,
                    height: `${this.props.imageCSSHeight}`,
                  }}
                ></canvas>
                <canvas
                  className="result-canvas border-4 border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
                  ref={this.resultCanvasRef}
                  width={this.props.imagePXWidth}
                  height={this.props.imagePXHeight}
                  style={{
                    width: `${this.props.imageCSSWidth}`,
                    height: `${this.props.imageCSSHeight}`,
                  }}
                ></canvas>
                <canvas
                  className="grid-canvas border-4 border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
                  ref={this.gridCanvasRef}
                  width={this.props.imagePXWidth}
                  height={this.props.imagePXHeight}
                  style={{
                    width: `${this.props.imageCSSWidth}`,
                    height: `${this.props.imageCSSHeight}`,
                  }}
                ></canvas>
              </div>
            </div>
            <div className="edit-area row-[1/12] col-[4/5] flex flex-col">
              <div className="size-edit-area flex flex-col">
                <div className="size-edit-bar flex-[0_0_30px] border-4 border-dark-line"></div>
                <div className="size-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
              </div>
              <div className="shape-edit-area flex flex-col">
                <div className="shape-edit-bar flex-[0_0_30px] border-4 border-dark-line"></div>
                <div className="shape-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
              </div>
              <div className="palette-edit-area flex flex-col">
                <div className="palette-edit-bar flex-[0_0_30px] border-4 border-dark-line"></div>
                <div className="palette-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
              </div>
              <div className="color-edit-area flex flex-col">
                <div className="color-edit-bar flex-[0_0_30px] border-4 border-dark-line"></div>
                <div className="color-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
              </div>
            </div>
            <div className="pix-btn-area row-[12/13] col-[4/5] grid grid-cols-2 gap-[10px]">
              <div className="pix-preview-btn border-4 border-dark-line"></div>
              <div className="pix-next-btn border-4 border-dark-line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
