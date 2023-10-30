import useImage from "use-image";
import { useRef, useEffect } from "react";
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Image, Transformer } from "react-konva";

const CustomImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(shapeProps.url);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
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