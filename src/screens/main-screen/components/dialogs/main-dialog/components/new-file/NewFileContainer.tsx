import React, { useState } from 'react'
import { Button, InputGroup } from "@blueprintjs/core";
import glslIcon from "../../../../../../../resources/images/glsl.svg";
import javaIcon from "../../../../../../../resources/images/java.png";
import javascriptIcon from "../../../../../../../resources/images/javascript.png";
import htmlIcon from "../../../../../../../resources/images/html.png";
import rustIcon from "../../../../../../../resources/images/rust.png";
import goIcon from "../../../../../../../resources/images/go.svg";
import { FileTypes } from '../../MainDialog';

interface IProps {
    onClose: () => void;
    onCreate?: (fileName: string, fileType: FileTypes) => void;
}

const NewFileContainer = (props: IProps) => {
    const [fileType, setFileType] = useState<FileTypes>(FileTypes.default);
    const [fileName, setFileName] = useState("");
    return <div>
        <h3
            style={{
                marginBottom: "25px",
                marginLeft: "12px",
                fontSize: "18px",
            }}
        >
            Select a Language
          </h3>
        <div className="ndf-lang-cards">
            <div
                className={`ndf-lang-card ${fileType === FileTypes.GLSL
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.GLSL)
                }}
            >
                <div className="licon">
                    <img src={glslIcon} alt="" />
                </div>
                <div className="ltext">GLSL</div>
            </div>
            <div
                className={`ndf-lang-card ${fileType === FileTypes.JAVASCRIPT
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.JAVASCRIPT)
                }}
            >
                <div className="licon">
                    <img src={javascriptIcon} alt="" />
                </div>
                <div className="ltext">Javascript</div>
            </div>
        </div>
        <div className="ndf-lang-cards">
            <div
                className={`ndf-lang-card ${fileType === FileTypes.RUST
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.RUST)
                }}
            >
                <div className="licon">
                    <img src={rustIcon} alt="" />
                </div>
                <div className="ltext">Rust</div>
            </div>
            <div
                className={`ndf-lang-card ${fileType === FileTypes.JAVA
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.JAVA)
                }}
            >
                <div className="licon">
                    <img src={javaIcon} alt="" />
                </div>
                <div className="ltext">Java</div>
            </div>
        </div>
        <div className="ndf-lang-cards">
            <div
                className={`ndf-lang-card ${fileType === FileTypes.GO
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.GO)
                }}
            >
                <div className="licon">
                    <img src={goIcon} alt="" />
                </div>
                <div className="ltext">Go</div>
            </div>
            <div
                className={`ndf-lang-card ${fileType === FileTypes.HTML
                    ? "ndf-lang-card-selected"
                    : "ndf-lang-card-notselected"
                    }`}
                onClick={() => {
                    setFileType(FileTypes.HTML)
                }}
            >
                <div className="licon">
                    <img src={htmlIcon} alt="" />
                </div>
                <div className="ltext">HTML</div>
            </div>
        </div>
        <div>
            <div className="nfda-content">
                <div className="nfile-input">
                    <InputGroup
                        id="folderName"
                        onChange={(e) => setFileName(e.target.value)}
                        value={fileName}
                        placeholder="File Name"
                    />
                </div>
                <div className="nfile-actions">
                    <Button
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                        onClick={() => {
                            //add new file
                            if(props.onCreate)
                            props.onCreate(fileName, fileType);
                            setFileName("");
                        }}
                    >
                        Create
                </Button>
                    {/* <Button small>Cancel</Button> */}
                </div>
            </div>
        </div>


    </div>
}

export default NewFileContainer;