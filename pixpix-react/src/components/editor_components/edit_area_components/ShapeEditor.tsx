import React from "react";

type MyProps = {};

type MyState = {};

class ShapeEditor extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }
  onUnmount = [] as (() => void)[];

  componentDidMount() {}

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  render() {
    return (
      <div className="shape-edit-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line "></div>
    );
  }
}

export default ShapeEditor;
