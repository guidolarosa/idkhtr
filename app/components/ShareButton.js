import { Rect, Text } from "react-konva";
import {  useState } from "react";
import { copyFocusedObjUrlToClipboard } from "../utils/utils";

const ShareButton = ({ shapeRef, shareRef, showShare, itemIndex, stage }) => {
  const [shareHover, setShareHover] = useState(false);

  return (
    <>
      {shareRef.current && (
        <Rect
          x={shapeRef.current.attrs.x + 10}
          y={shapeRef.current.attrs.y + 10}
          fill={shareHover ? "black" : "white"}
          stroke={"black"}
          width={shareRef.current.textWidth + 20}
          height={shareRef.current.textHeight * 2.5}
          strokeWidth={1}
          visible={showShare}
        />
      )}
      <Text
        text="SHARE"
        letterSpacing={1}
        fill={shareHover ? "white" : "black"}
        ref={shareRef}
        x={shapeRef.current.attrs.x + 20}
        y={shapeRef.current.attrs.y + 20}
        visible={showShare}
        onMouseEnter={() => {
          setShareHover(true);
          stage.container().style.cursor = "pointer"
        }}
        onMouseLeave={() => {
          setShareHover(false);
          stage.container().style.cursor = "default"
        }}
        onClick={() => {
          // copyCoordinateUrlToClipboard(shapeRef.current);
          copyFocusedObjUrlToClipboard(itemIndex);
        }}
      />
    </>
  );
};

export default ShareButton;
