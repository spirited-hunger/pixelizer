import React from "react";

function FuncComp(props: { initNum: number }) {
  let numberState = React.useState(props.initNum);
  let number = numberState[0]; // 상태값
  let setNumber = numberState[1]; // 상태값 설정

  let [date, setDate] = React.useState(new Date().toString());

  return (
    <div className="border-2 border-black m-4">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {date}</p>
      <input
        className="border-2 border-black bg-slate-300"
        type="button"
        value="random"
        onClick={() => {
          setNumber(Math.floor(Math.random() * 100));
        }}
      />
      <input
        className="border-2 border-black bg-slate-300"
        type="button"
        value="date"
        onClick={() => {
          setDate(new Date().toString());
        }}
      />
    </div>
  );
}

class ClassComp extends React.Component<
  { initNum: number },
  { number: number; date: string }
> {
  state = {
    number: this.props.initNum, // initial number
    date: new Date().toString(), // initial date
  };
  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    return (
      <div className="border-2 border-black m-4">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          className="border-2 border-black bg-slate-300"
          type="button"
          value="random"
          onClick={() => {
            this.setState({ number: Math.floor(Math.random() * 100) });
          }}
        />
        <input
          className="border-2 border-black bg-slate-300"
          type="button"
          value="date"
          onClick={() => {
            this.setState({ date: new Date().toString() });
          }}
        />
      </div>
    );
  }
}

export function Test() {
  return (
    <div className="border-2 border-black m-4">
      <h1 className="text-5xl">Test</h1>
      <FuncComp initNum={1} />
      <ClassComp initNum={1} />
    </div>
  );
}
