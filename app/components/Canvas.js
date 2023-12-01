import { Stage, Layer } from "react-konva";
import { useRef, useState, useEffect } from "react";
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import { checkDeselect } from "../utils/konva-utils";
import { getSanityImage, urlFor } from "../utils/sanity";
import CustomLink from "./CustomLink";

const Canvas = ({ selectedIssue }) => {
  const [selectedId, selectShape] = useState(0);
  const stageRef = useRef();
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;
    if (selectedIssue) {
      setObjects(
        selectedIssue.items.map((item) => {
          let basicItem = {
            type: item.itemType,
          };

          if (item.itemType == "image") {
            const [, , dimensions] = pattern.exec(item.image.asset._ref);
            const [width, height] = dimensions
              .split("x")
              .map((v) => parseInt(v, 10));
            return {
              ...basicItem,
              x: item.x ? item.x : 0,
              y: item.y ? item.y : 0,
              width: width > 200 ? width / 2 : 200,
              height: height > 200 ? height / 2 : 200,
              url: urlFor(item.image),
            };
          }

          if (item.itemType == "link") {
            return {
              ...basicItem,
              x: item.x ? item.x : 0,
              y: item.y ? item.y : 0,
              // width: width > 200 ? width / 2 : 200,
              // height: height > 200 ? height / 2 : 200,
              url: item.url,
            };
          }
        })
      );
    }
  }, [selectedIssue]);

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
      onMouseDown={(e) => {
        checkDeselect(e, selectShape);
      }}
      onTouchStart={(e) => {
        checkDeselect(e, selectShape);
      }}
      draggable
      ref={stageRef}
    >
      <Layer scaleX={0.75} scaleY={0.75}>
        {objects.map((obj, idx) => {
          console.log(obj);
          const objectProps = {
            key: idx,
            shapeProps: obj,
            isSelected: idx === selectedId,
            onSelect: () => {
              selectShape(idx);
            },
            onChange: (newAttrs) => {
              const objs = objects.slice();
              objs[idx] = newAttrs;
              setObjects(objs);
            },
            text:
              obj.type === "link" ? (obj.text ? obj.text : obj.url) : undefined,
            url: obj.type === "link" ? obj.url : undefined,
          };

          // console.log(objectProps);

          if (obj.type === "image") {
            return (
              <CustomImage
                key={idx}
                shapeProps={objectProps.shapeProps}
                isSelected={objectProps.isSelected}
                onSelect={objectProps.onSelect}
                onChange={objectProps.onChange}
              />
            );
          } else if (obj.type === "text") {
            return <CustomText key={idx} {...objectProps} />;
          } else if (obj.type === "link") {
            return (
              <CustomLink key={idx} {...objectProps} text={objectProps.text} />
            );
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
