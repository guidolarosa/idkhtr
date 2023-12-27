import React from 'react';
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Text, Transformer, Rect } from "react-konva";
import { useRef, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ShareButton from './ShareButton';

const CustomLink = ({ shapeProps, isSelected, onSelect, onChange, text, url }) => {
  const [ showShare, setShowShare ] = useState(false)
  const shapeRef = useRef(null);
  const shareRef = useRef(null);
  const trRef = useRef();
  const router = useRouter()

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
        align="center"
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
      {shapeRef.current && (
        <ShareButton 
          shareRef={shareRef}
          shapeRef={shapeRef}
          showShare={showShare}
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

export default CustomLink;
