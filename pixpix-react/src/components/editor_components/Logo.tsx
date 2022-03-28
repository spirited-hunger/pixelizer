import React from "react";

type MyProps = {
}

export class Logo extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logo-area min-h-[150px] flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-2">
        PIXPIX
      </div>
    );
  }
}