import React from "react";
import { MenuButton } from "./menu_components/MenuButton";

type MyProps = {
}

export class Menu extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu-area flex flex-col justify-end items-stretch col-start-1 col-end-2 row-start-2 row-end-3">
        <MenuButton buttonName={"open image"} />
        <MenuButton buttonName={"reset image"} />
        <MenuButton buttonName={"save image"} />
        <MenuButton buttonName={"share image"} />
      </div>
    );
  }
}