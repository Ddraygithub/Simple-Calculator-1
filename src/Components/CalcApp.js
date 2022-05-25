import React, { useReducer } from 'react';
import '../CalcApp.css';
import styled from 'styled-components';


function CalculatorApp() {
  const ACTIONS = {
    digits: "chooseNum",
    operations: "chooseOper",
    evalu: "chooseEval",
    clr: "chooseDel",
  };

  const ops = ["+", "/", "-", "=", "*"];

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "chooseNum":
        if (payload === "AC") {
          return { ...state, curr: "", prev: "", oper: "", clrdel: "del", overload: false, sign: "", opSign: "" };
        }
        if (state.overload) {
          return { ...state, curr: payload, prev: "", overload: false, sign: "" }
        }
        if (payload === "0" && state.curr === "0") {
          return state;
        }
        if (payload === "." && state.curr.includes(".")) {
          return state;
        }
        return { ...state, curr: state.curr + payload };

      case "chooseOper":

        if (payload === "-" && state.curr.length === 0) {
          return { ...state, curr: payload, opSign: signDisplay(payload) };
        }
        if (ops.includes(payload)) {
          if (state.prev.length > 0 && state.oper && state.curr.length === 0) {
            return { ...state, opSign: signDisplay(payload), oper: state.oper.replace(state.oper.slice(-1), payload) };
          }
          if (state.curr.length === 0) {
            return { ...state };
          }

          if (state.prev.length > 0) {
            return {
              ...state,
              prev: evaluate(state.prev, state.curr, state.oper),
              curr: "",
              oper: payload,
              opSign: signDisplay(payload)
            };
          }
        }
        return { ...state, prev: state.curr, curr: "", oper: payload, opSign: signDisplay(payload) };
      case "chooseDel":
        if (payload === "del" && state.curr.length === 0) {
          return state;
        }
        if (payload === "del") {
          return { ...state, curr: state.curr.slice(0, -1) };
        }

        if (payload === "C") {
          return { ...state, curr: "", prev: "", oper: "", clrdel: "del", overload: false, sign: "", opSign: "" };
        }
        return;
      case "chooseEval":
        if (state.curr.length === 0) {
          return state;
        }
        return { ...state, curr: "", prev: evaluate(state.prev, state.curr, state.oper), oper: "", clrdel: "C", overload: true, sign: "=", opSign: "" };
      default:
        return state;
    }
  };

  const evaluate = (num1, num2, operaton) => {
    let x = parseFloat(num1);
    let y = parseFloat(num2);
    if (isNaN(x) || isNaN(y)) {
      return;
    }
    let calc = "";

    switch (operaton) {
      case "+":
        calc = x + y;
        break;
      case "-":
        calc = x - y;
        break;
      case "/":
        calc = x / y;
        break;
      case "*":
        calc = x * y;
        break;
      default:
        return calc;
    }
    return calc.toString();
  };

  const signDisplay = (a) => {
    switch (a) {
      case '/':
        return (
          <span>&divide;</span>
        )
      case '*':
        return (
          <span>&times;</span>
        )
      case '-':
        return (
          <span>&minus;</span>
        )
      case '+':
        return (
          <span>&#43;</span>
        )
      default:
        return ""
    }
  }



  const [state, dispatch] = useReducer(reducer, {
    curr: "",
    prev: "",
    oper: "",
    clrdel: "del",
    overload: false,
    sign: "",
    opSign: ""
  });

  const createDigit = () => {
    const digits = [];
    for (let f = 9; f > 0; f--) {
      digits.push(
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.digits, payload: f.toString() })
          }
          key={f}
        >
          {f}
        </button>
      );
    }
    return digits;
  };

  const myNumFomat = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 7
  });

  // const numberFomatter = (formNum) => {
  //   if(formNum.length === 0) {
  //     return;
  //   }
  //   const [Wnum, Dnum ] = formNum.split(".")
  //   if(Dnum === null) {
  //     return myNumFomat.format(Wnum)
  //   }
  //   return `${ myNumFomat.format(Wnum)}`;
  // }

  return (
    <ManCont>
      <Container>
        <div>

          {/* Output display */}


          <div id="upperdsplay">
            {myNumFomat.format(state.prev)}
            {state.opSign}
            <span style={{ fontSize: "12px" }} >{state.sign}</span>
          </div>
          <div id="lowerdsplay">{myNumFomat.format(state.curr) || "0"}</div>
        </div>
        <div id="opinputs">

          <div id="nums">
            {createDigit()}

            <button
              onClick={() => dispatch({ type: ACTIONS.digits, payload: "." })}
            >
              .
            </button>

            <button
              onClick={() => dispatch({ type: ACTIONS.digits, payload: "0" })}
            >
              0
            </button>

            <button
              onClick={() => dispatch({ type: ACTIONS.digits, payload: "AC" })}
            >
              AC
            </button>
          </div>
          <div id="operatons">
            <div id="operatons1">
              <button
                onClick={() =>
                  dispatch({ type: ACTIONS.operations, payload: "/" })
                }
              >
                &divide;
              </button>
              <button
                onClick={() =>
                  dispatch({ type: ACTIONS.operations, payload: "*" })
                }
              >
                &times;
              </button>
              <button
                onClick={() =>
                  dispatch({ type: ACTIONS.operations, payload: "-" })
                }
              >
                &minus;
              </button>
              <button
                onClick={() =>
                  dispatch({ type: ACTIONS.operations, payload: "+" })
                }
              >
                &#43;
              </button>
            </div>
            <div id="operatons2">
              <div>
                <button onClick={() => dispatch({ type: ACTIONS.clr, payload: state.clrdel })}>
                  {state.clrdel}
                </button>
              </div>
              <div>
                <button
                  style={{ lineHeight: "80px", fontSize: "35px" }}
                  onClick={() => dispatch({ type: ACTIONS.evalu, payload: state.clrdel })}
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ManCont>
  );
}

export default CalculatorApp;

const ManCont = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin: 20px 20px 0px 0px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: 65vh;
  max-height: 400px;
  background-color: #fff;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(113, 117, 136, 0.5);
  background-color: rgb(94, 104, 128);

  #upperdsplay,
  #lowerdsplay {
    height: 50px;
    margin-top: 10px;
    color: white;
    text-align: right;
    padding: 2px 5px;
    cursor: progress;
    font-size: 27px;
  }

  #upperdsplay {
    margin: 0px;
    font-size: 25px;
    padding-top: 10px;
  }

  #opinputs {
    border: 5px sold green;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #35314d58;

    button {
      color: white;
      appearance: none;
      outline: none;
      border: none;
      font-size: 20px;
      padding: 10px;
      transition: 0.4s;
      cursor: pointer;
    }

    #nums {
      border-right: 0.5px solid gray;
      height: calc(55vh - 50px);
      display: flex;
      flex-wrap: wrap;
      flex-direction: row-reverse;
      max-width: 70%;

      button {
        flex: 1 1 33.33%;
        width: 33.333%;
        background-color: transparent;

        :hover {
          background-color: #f5f1f160;
        }
      }
    }

    #operatons {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      max-width: 30%;
      height: calc(55vh - 50px);

      #operatons1 {
        height: calc(55vh - 50px);
        width: 50%;
        button {
          flex: 1 1 50%;
          background-color: transparent;
          width: 100%;
          height: 75px;

          :hover {
            background-color: #f5f1f160;
          }
        }
      }

      #operatons2 {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        flex-direction: column;
        justify-content: space-between;
        height: calc(55vh - 50px);
        align-items: center;

        button {
          flex: 1 1 50%;
          background-color: transparent;
          width: 100%;
          height: 75px;

          :hover {
            background-color: #f5f1f160;
          }
        }
      }
    }
  }
`;
