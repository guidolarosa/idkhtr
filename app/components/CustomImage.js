import useImage from "use-image";
import { useRef, useEffect, useState } from "react";
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Image, Transformer, Group } from "react-konva";
import ShareButton from "./ShareButton";
import { handleSelect } from '../utils/utils';


const CustomImage = ({ shapeProps, isSelected, onSelect, onChange, focused, idx, stage }) => {
  const [image] = useImage(shapeProps.url);
  const [showShare, setShowShare] = useState(false);
  const shapeRef = useRef(null);
  const shareRef = useRef(null);
  const trRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    handleSelect(shapeRef.current, groupRef.current, trRef.current, setShowShare, isSelected);

    if (focused) {
      groupRef.current.moveToTop()
    }
  }, [isSelected, focused]);

  return (
    <Group ref={groupRef}>
      <Image
        alt="Image"
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        shadowBlur={1}
        {...shapeProps}
        draggable
        onDragStart={() => {
          setShowShare(false);
        }}
        onDragEnd={(e) => {
          setShowShare(true);
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        strokeWidth={focused ? 10 : 0}
        stroke={focused ? "red" : "transparent"}
        onTransformEnd={(e) => {
          onTransformEnd(e, shapeRef, onChange, shapeProps);
        }}
      />
      {shapeRef.current && (
        <ShareButton
          shareRef={shareRef}
          shapeRef={shapeRef}
          showShare={showShare}
          itemIndex={idx}
          stage={stage}
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
    </Group>
  );
};

export default CustomImage;
