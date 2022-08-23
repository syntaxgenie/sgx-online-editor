import { Intent, IToastProps, Position, Toaster } from "@blueprintjs/core";
import { createContext, useContext, useState } from "react";

export interface IEditorContext {
  showMessage: (message: string,type:Intent) => void;
}

interface IState {}

const initialContext: IEditorContext = {
  showMessage: (message: string,type:Intent) => {},
};

const initialState: IState = {};

const EditorContext = createContext<IEditorContext>(initialContext);

interface IProps {
  children: any;
}

export const EditorProvider = (props: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState(initialState);

  let toaster: Toaster | null;

  const showMessage = (message: string,type:Intent) => {
    addToast({
      message: message,
      intent: type,
    });
  };

  const addToast = (toast: IToastProps) => {
    toast.timeout = 5000;
    toaster?.show(toast);
  };
  return (
    <>
      <EditorContext.Provider value={{ ...state, showMessage }}>
        {props.children}
      </EditorContext.Provider>
      <Toaster
        autoFocus={false}
        canEscapeKeyClear={true}
        position={Position.BOTTOM_RIGHT}
        usePortal={true}
        ref={(ref) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          toaster = ref;
        }}
      />
    </>
  );
};

export const useEditor = (): IEditorContext => useContext(EditorContext);
