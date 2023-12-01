import React from 'react';
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Text, Transformer } from "react-konva";
import { useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';

const CustomLink = ({ shapeProps, isSelected, onSelect, onChange, text, url }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const router = useRouter()

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        {...shapeProps}
        padding={10}
        onClick={onSelect}
        onDblClick={() => {router.push(url) }}
        onDblTap={() => {router.push(url) }}
        onTap={onSelect}
        ref={shapeRef}
        text={text}
        url={url}
        fontSize={24}
        fontStyle='bold'
        fill={'blue'}
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

export default CustomLink;
