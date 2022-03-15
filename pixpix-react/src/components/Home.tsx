import React from "react";
import { Link } from "./home_components/Link";
import { Logo } from "./home_components/Logo";
import { Preview } from "./home_components/Preview";

// TODO : 업로드시 에디터로 이동

type MyProp = {
  handleFileUpload: (file: File) => void,
  dragDropMessage: string,
};

type MyState = {
};

export class Home extends React.Component<MyProp, MyState> {
  constructor(props: MyProp) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="m-0 grid grid-cols-2 auto-rows-[100vh]">
        <div className="bg-dark-grey flex justify-center items-center">
          <Link />
          <Logo />
        </div>
        <div className="bg-gradient-to-b from-blue-grey to-smooth-grey flex justify-center items-center overflow-x-auto overflow-y-auto">
          <Preview dragDropMessage={this.props.dragDropMessage} />
        </div>
      </div>
    );
  }
}
