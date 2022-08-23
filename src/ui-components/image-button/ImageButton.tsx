import React from 'react'
import "./image-button.scss";


interface IProps {
  text: string;
  image: string;
  className?:string;
  onClick: () => void;
  
}

const ImageButton = (props: IProps) => {
  return (
    <div onClick={props.onClick} className={`image-button-wrapper ${props.className}`} >
      <div className="ib-image">
        <img src={props.image} alt="" />
      </div>
      <div className="ib-text">{props.text}</div>
    </div>
  );
};

export default ImageButton;
