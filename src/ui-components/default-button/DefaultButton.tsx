import React from 'react'
import "./default-button.scss";


interface IProps {
  text: string;
  onClick: () => void;
  
}

const DefaultButton = (props: IProps) => {
  return (
    <div onClick={props.onClick} className="defult-button" >
      {props.text}
    </div>
  );
};

export default DefaultButton;
