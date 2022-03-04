import React from "react";
import { Link } from "react-router-dom";

function FuncComp(props: {initNum: number}) {
  return (
    <div className="border-2 border-black m-4">
      <h2>function style component</h2>
      <p>Number : {props.initNum}</p>
    </div>
  );
}

class ClassComp extends React.Component <{initNum: number}, {}> {
  render() {
    return (
      <div className="border-2 border-black m-4">
        <h2>class style component</h2>
        <p>Number : {this.props.initNum}</p>
      </div>
    );
  }
}

export function Test() {
  return (
    <div className="border-2 border-black m-4">
      <h1 className="text-5xl">Test</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="editor">Editor</Link>
      </nav>
      <FuncComp initNum={2} />
      <ClassComp initNum={2}/>
    </div>
  );
}
