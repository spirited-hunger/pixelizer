import React from "react";

type MyProps = {
  curStageHandler: (stage: "size" | "shape" | "palette" | "color") => void;
  curStage: "size" | "shape" | "palette" | "color";
};

export class EditArea extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-area row-[1/12] col-[4/5] flex flex-col">
        <div className="size-edit-area flex flex-col mb-[10px]">
          <div className="size-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line">
            pixel size
          </div>
          {this.props.curStage === "size" ? (
            <div className="size-edit-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line "></div>
          ) : null}
        </div>
        <div className="shape-edit-area flex flex-col mb-[10px]">
          <div className="shape-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line">
            pixel shape
          </div>
          {this.props.curStage === "shape" ? (
            <div className="shape-edit-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line"></div>
          ) : null}
        </div>
        <div className="palette-edit-area flex flex-col mb-[10px]">
          <div className="palette-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line">
            pixel palette
          </div>
          {this.props.curStage === "palette" ? (
            <div className="palette-edit-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line"></div>
          ) : null}
        </div>
        <div className="color-edit-area flex flex-col">
          <div className="color-edit-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line">
            pixel color
          </div>
          {this.props.curStage === "color" ? (
            <div className="color-edit-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line"></div>
          ) : null}
        </div>
      </div>
    );
  }
}
