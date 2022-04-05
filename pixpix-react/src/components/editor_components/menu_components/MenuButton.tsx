import React from "react";

type MyProps = {
  buttonName: string;
}

export class MenuButton extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flex justify-center items-center min-h-[50px]">
        <div className="h-[20px]">{this.props.buttonName}</div>
      </div>
    );
  }
}
