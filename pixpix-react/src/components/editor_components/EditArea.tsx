import React from "react";
import ColorEditor from "./edit_area_components/ColorEditor";
import PaletteEditor from "./edit_area_components/PaletteEditor";
import ShapeEditor from "./edit_area_components/ShapeEditor";
import SizeEditor from "./edit_area_components/SizeEditor";

type MyProps = {
  stages : {
    curStage: "size" | "shape" | "palette" | "color";
    isSizeDone: boolean;
    isShapeDone: boolean;
    isPaletteDone: boolean;
    isColorDone: boolean;
  };
  curStageHandler: (stage: "size" | "shape" | "palette" | "color") => void;
};

export class EditArea extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  handleClick = (stage: "size" | "shape" | "palette" | "color") => {
    switch (stage) {
      case "size":
        if (this.props.stages.isSizeDone) {
          this.props.curStageHandler("size");
        }
        break;
      case "shape":
        if (this.props.stages.isShapeDone) {
          this.props.curStageHandler("shape");
        }
        break;
      case "palette":
        if (this.props.stages.isPaletteDone) {
          this.props.curStageHandler("palette");
        }
        break;
      case "color":
        if (this.props.stages.isColorDone) {
          this.props.curStageHandler("color");
        }
        break;
    }
  };

  render() {
    return (
      <div className="edit-area row-[1/12] col-[4/5] flex flex-col">
        <div className="size-edit-area flex flex-col mb-[10px]">
          <div
            className="size-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line"
            onClick={() => this.handleClick("size")}
          >
            pixel size
          </div>
          {this.props.stages.curStage === "size" ? <SizeEditor /> : null}
        </div>
        <div className="shape-edit-area flex flex-col mb-[10px]">
          <div
            className="shape-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line"
            onClick={() => this.handleClick("shape")}
          >
            pixel shape
          </div>
          {this.props.stages.curStage === "shape" ? <ShapeEditor /> : null}
        </div>
        <div className="palette-edit-area flex flex-col mb-[10px]">
          <div
            className="palette-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line"
            onClick={() => this.handleClick("palette")}
          >
            pixel palette
          </div>
          {this.props.stages.curStage === "palette" ? <PaletteEditor /> : null}
        </div>
        <div className="color-edit-area flex flex-col">
          <div
            className="color-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line"
            onClick={() => this.handleClick("color")}
          >
            pixel color
          </div>
          {this.props.stages.curStage === "color" ? <ColorEditor /> : null}
        </div>
      </div>
    );
  }
}
