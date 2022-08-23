import {
  Alignment,
  Button,
  Icon,
  Navbar,
  Position,
  Tooltip,
} from "@blueprintjs/core";
import React from "react";

const ToolBar = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT} style={{ justifyContent: "center" }}>
        <Tooltip content="Create new file" position={Position.BOTTOM}>
          <Button
            className="bp3-minimal"
            icon={<Icon icon="new-object" intent="danger" />}
          />
        </Tooltip>
        <Button className="bp3-minimal" icon="folder-new" />
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="layers" />
        <Button className="bp3-minimal" icon="book" />
        <Button className="bp3-minimal" icon="bookmark" />
        <Button className="bp3-minimal" icon="cell-tower" />
        <Button className="bp3-minimal" icon="widget" />
        <Button className="bp3-minimal" icon="waterfall-chart" />
      </Navbar.Group>
      <Navbar.Group
        align={Alignment.CENTER}
        style={{ justifyContent: "center" }}
      >
        <Button
          className="bp3-minimal"
          icon={<Icon icon="play" intent="danger" />}
        />
        <Button className="bp3-minimal" icon="stop" />
      </Navbar.Group>
    </Navbar>
  );
};

export default ToolBar;
