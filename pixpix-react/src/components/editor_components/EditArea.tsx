import React from "react";

type MyProps = {
}

export class EditArea extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-area row-[1/12] col-[4/5] flex flex-col">
        <div className="size-edit-area flex flex-col">
          <div className="size-edit-bar bg-dark-grey flex-[0_0_30px] border-4 border-dark-line"></div>
          <div className="size-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
        </div>
        <div className="shape-edit-area flex flex-col">
          <div className="shape-edit-bar bg-dark-grey flex-[0_0_30px] border-4 border-dark-line"></div>
          <div className="shape-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
        </div>
        <div className="palette-edit-area flex flex-col">
          <div className="palette-edit-bar bg-dark-grey flex-[0_0_30px] border-4 border-dark-line"></div>
          <div className="palette-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
        </div>
        <div className="color-edit-area flex flex-col">
          <div className="color-edit-bar bg-dark-grey flex-[0_0_30px] border-4 border-dark-line"></div>
          <div className="color-edit-content flex-[1_0_auto] border-l-4 border-r-4 border-b-4 border-dark-line"></div>
        </div>
      </div>
    );
  }
}