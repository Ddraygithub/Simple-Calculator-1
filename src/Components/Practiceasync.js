import React from 'react';
import styled from 'styled-components';


function Practiceasync({dispatch, digit, ACTION, OPER}) {
  return (
    <Cont>
      <button onClick={() => dispatch({ type: ACTION.ADDDIGIT, payload:  digit })} >
        {digit}
      </button>
    </Cont>
  )
}

export default Practiceasync;

const Cont = styled.div`
  button {
    padding: 15px;
    background-color: transparent;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    font-size: 25px;
    outline: none;
    border: none;
    color: white;

    @media screen and (min-width: 500px){
      width: 40px;
      height: 40px;

    }
  }
`