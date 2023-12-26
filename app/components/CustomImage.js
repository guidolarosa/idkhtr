import useImage from "use-image";
import { useRef, useEffect, useState } from "react";
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Image, Transformer, Rect, Text } from "react-konva";

const CustomImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(shapeProps.url);
  const [ showShare, setShowShare ] = useState(false)
  const shapeRef = useRef();
  const shareRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      setShowShare(true);
    } else {
      setShowShare(false);
    }
  }, [isSelected]);



  return (
    <>
      <Image
        alt="Image"
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          onTransformEnd(e, shapeRef, onChange, shapeProps);
        }}
      />
      {shareRef.current && (
        <Rect
          x={shapeRef.current.attrs.x + 10}
          y={shapeRef.current.attrs.y + 10}
          fill="white"
          width={shareRef.current.textWidth + 20}
          height={shareRef.current.textHeight * 2.5}
          strokeWidth={1}
          stroke={'black'}
          visible={showShare}
        />
      )}
      {shapeRef.current && (
        <Text
          text="SHARE"
          ref={shareRef}
          x={shapeRef.current.attrs.x + 20}
          y={shapeRef.current.attrs.y + 20}
          visible={showShare}
          onClick={() => {
            alert('Copied element position to clipboard')
          }}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            boundBoxFunc(oldBox, newBox);
          }}
        />
      )}
    </>
  );
};

export default CustomImage;
