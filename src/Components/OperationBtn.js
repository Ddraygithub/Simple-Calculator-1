import React from 'react';
import styled from 'styled-components';


function OperationBtn({dispatch, ACTION, Oper, rOper}) {
  return (
    <Cont>
      <button onClick={() => dispatch({ type: ACTION.OPER, payload:  Oper })} >
        {rOper}
      </button>
    </Cont>
  )
}

export default OperationBtn;

const Cont = styled.div`
  button {
    padding: 15px;
    background-color: transparent;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 25px;
    outline: none;
    border: none;
    color: white;

  }
`