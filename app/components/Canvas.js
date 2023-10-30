import { Stage, Layer } from "react-konva";
import { useRef, useState, useEffect } from "react";
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import { checkDeselect } from "../utils/konva-utils";
import { initialObjects } from "../mock/konva-mock";

const Canvas = () => {
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef();
  const [objects, setObjects] = useState(initialObjects);

  useEffect(() => {
    let scaleBy = 1.01;
    stageRef.current.on("wheel", (e) => {
      e.evt.preventDefault();

      var oldScale = stageRef.current.scaleX();
      var pointer = stageRef.current.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - stageRef.current.x()) / oldScale,
        y: (pointer.y - stageRef.current.y()) / oldScale,
      };

      let direction = e.evt.deltaY > 0 ? 1 : -1;

      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stageRef.current.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stageRef.current.position(newPos);
    });
  }, []);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e) => {checkDeselect(e, selectShape)}}
      onTouchStart={(e) => {checkDeselect(e, selectShape)}}
      draggable
      ref={stageRef}
    >
      <Layer>
        {objects.map((obj, i) => {
          const objectProps = {
            key: i,
            shapeProps: obj,
            isSelected: i === selectedId,
            onSelect: () => {
              selectShape(i);
            },
            onChange: (newAttrs) => {
              const objs = objects.slice();
              objs[i] = newAttrs;
              setObjects(objs);
            },
          };

          if (obj.type === "image") {
            return <CustomImage {...objectProps} />;
          } else if (obj.type === "text") {
            return <CustomText {...objectProps} />;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
