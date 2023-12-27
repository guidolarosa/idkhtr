import { Stage, Layer } from "react-konva";
import { useRef, useState, useEffect } from "react";
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import { checkDeselect } from "../utils/konva-utils";
import CustomLink from "./CustomLink";
import { useRouter, useSearchParams } from "next/navigation";
import { buildObjectProps, setScaleStageEvent, setInitialObjects } from "../utils/utils";

const Canvas = ({ selectedIssue }) => {
  const [selectedId, selectShape] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const stageRef = useRef();
  const [objects, setObjects] = useState([]);
  const [initialCoordinates, setInitialCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const query = useSearchParams();

  useEffect(() => {
    setInitialCoordinates({
      x: query.get("x"),
      y: query.get("y"),
    });
    setFocusedItem(parseInt(query.get("focusedItem")))
  }, [query]);

  useEffect(() => {
    setInitialObjects(selectedIssue, setObjects);
  }, [selectedIssue]);

  useEffect(() => {
    setScaleStageEvent(stageRef)
  }, []);

  useEffect(() => {
    if (focusedItem && objects[focusedItem]) {
      let object = objects[focusedItem]
      // console.log(object);
      setInitialCoordinates({
        x: object.x - window.innerWidth / 2 + object.width / 2,
        y: object.y - window.innerHeight / 2 + object.height / 2
      })
    }
  }, [objects, focusedItem])

  return (
    <Stage
      offsetX={initialCoordinates.x}
      offsetY={initialCoordinates.y}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e) => {
        checkDeselect(e, selectShape);
      }}
      onTouchStart={(e) => {
        checkDeselect(e, selectShape);
      }}
      draggable
      ref={stageRef}
    >
      <Layer scaleX={1} scaleY={1}>
        {objects.map((obj, idx) => {
          const objectProps = buildObjectProps(
            obj,
            idx,
            selectedId,
            selectShape,
            objects,
            setObjects,
            focusedItem
          );

          if (obj.type === "image") {
            return <CustomImage key={idx} {...objectProps} />;
          } else if (obj.type === "text") {
            return <CustomText key={idx} {...objectProps} />;
          } else if (obj.type === "link") {
            return <CustomLink key={idx} {...objectProps} />;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
