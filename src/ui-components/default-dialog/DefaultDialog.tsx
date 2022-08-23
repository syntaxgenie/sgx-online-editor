import { Dialog } from "@blueprintjs/core";
import React from "react";

interface IProps {
  children: any;
  isOpen:boolean;
  onClose:()=>void;
  title?:string;
  width?:number;

}

const DefalutDialog = (props: IProps) => {
  return props.title?(
    <Dialog
      className="bp3-dark"
      autoFocus={true}
      canEscapeKeyClose={true}
      canOutsideClickClose={true}
      enforceFocus={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
      usePortal={true}
      title={props.title}
      style={{width:"820px",padding:"0px",backgroundColor:"#27414F"}}
    >
      {props.children}
    </Dialog>
  ):<Dialog
  className="bp3-dark"
  autoFocus={true}
  canEscapeKeyClose={true}
  canOutsideClickClose={true}
  enforceFocus={true}
  isOpen={props.isOpen}
  onClose={props.onClose}
  usePortal={true}
  style={{width:`${props.width?props.width:820}px`,padding:"0px",backgroundColor:"#27414F"}}
>
  {props.children}
</Dialog>;
};

export default DefalutDialog;
