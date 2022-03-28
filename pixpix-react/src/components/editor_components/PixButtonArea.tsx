import React from "react";

type MyProps = {
}

export class PixButtonArea extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pix-btn-area row-[12/13] col-[4/5] grid grid-cols-2 gap-[10px]">
        <div className="pix-preview-btn border-pix bg-dark-grey border-dark-line flex justify-center items-center">
          PREVIEW
        </div>
        <div className="pix-next-btn border-pix bg-dark-grey border-dark-line flex justify-center items-center">
          NEXT
        </div>
      </div>
    );
  }
}
