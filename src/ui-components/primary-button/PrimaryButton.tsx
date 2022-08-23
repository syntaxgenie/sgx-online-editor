import React from 'react'
import "./primary-button.scss";


interface IProps {
  text: string;
  onClick: () => void;
  
}

const PrimaryButton = (props: IProps) => {
  return (
    <div onClick={props.onClick} className="primary-button" >
      {props.text}
    </div>
  );
};

export default PrimaryButton;
