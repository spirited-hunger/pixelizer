import React from "react";
import { ImageArea } from "./editor_components/ImageArea";
import { EditArea } from "./editor_components/EditArea";
import { PixButtonArea } from "./editor_components/PixButtonArea";
import { Github } from "./editor_components/Github";
import { Logo } from "./editor_components/Logo";
import { Menu } from "./editor_components/Menu";

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

  constructor(props: MyProps) {
    super(props);
    this.state = {};

  }
  onUnmount = [] as (() => void)[];

  componentDidMount() {

  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  render() {
    return (
      <div className="main-area bg-gradient-to-b from-blue-grey to-smooth-grey border-none grid grid-cols-[1fr_6fr] auto-rows-[100vh]">
        <div className="nav-area bg-dark-grey min-w-[300px] grid grid-rows-[1fr_5fr_1fr] auto-rows-[minmax(100px, auto)]">
          <Logo />
          <Menu />
          <Github />
        </div>
        <div className="editor-area flex bg-[#eee] justify-center items-center overflow-x-auto overflow-y-auto">
          <div className="pixarea flex-[0_0_1200px] h-[900px] w-[1200px] grid grid-cols-[repeat(4,_1fr)] grid-rows-[repeat(12,_1fr)] gap-[10px]">
            <ImageArea 
              imageURL={this.props.imageURL}
              imageElement={this.props.imageElement}
              imagePXWidth={this.props.imagePXWidth}
              imagePXHeight={this.props.imagePXHeight}
              imageCSSWidth={this.props.imageCSSWidth}
              imageCSSHeight={this.props.imageCSSHeight}
              imageDirection={this.props.imageDirection}
            />
            <EditArea />
            <PixButtonArea />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
