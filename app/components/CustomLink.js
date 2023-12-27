import React from 'react';
import { boundBoxFunc, onTransformEnd } from "../utils/konva-utils";
import { Text, Transformer, Group } from "react-konva";
import { useRef, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ShareButton from './ShareButton';
import { handleSelect } from '../utils/utils';

const CustomLink = ({ shapeProps, isSelected, onSelect, onChange, text, url, stage, idx , focused }) => {
  const [ showShare, setShowShare ] = useState(false)
  const shapeRef = useRef(null);
  const shareRef = useRef(null);
  const groupRef = useRef(null);
  const trRef = useRef();
  const router = useRouter()

  useEffect(() => {
    handleSelect(shapeRef.current, groupRef.current, trRef.current, setShowShare, isSelected)
  }, [isSelected]);

  return (
    <Group ref={groupRef}>
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
        fill={focused ? "red" : "blue"}
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

export default CustomLink;
