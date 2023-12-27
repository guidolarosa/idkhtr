import { urlFor } from "../utils/sanity";

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied element position to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const getPathname = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  return `${hostname}${port && `:${port}`}`;
}

export const buildCoordinateUrl = (x, y) => {
  return `${getPathname()}/?x=${x}&y=${y}`;
};

export const buildFocusedItemUrl = (index) => {
  return `${getPathname()}/?focusedItem=${index}`;
}

export const copyCoordinateUrlToClipboard = (object) => {
  const x = object.attrs.x;
  const y = object.attrs.y;
  const coordinateUrl = buildCoordinateUrl(x, y);
  copyToClipboard(coordinateUrl);
};

export const copyFocusedObjUrlToClipboard = (idx) => {
  const focusedItemUrl = buildFocusedItemUrl(idx)
  copyToClipboard(focusedItemUrl)
}

export const buildObjectProps = (
  obj,
  idx,
  selectedId,
  selectShape,
  objects,
  setObjects,
  focusedItem
) => {
  return {
    idx: idx,
    shapeProps: obj,
    isSelected: idx === selectedId,
    focused: focusedItem === idx,
    onSelect: () => {
      selectShape(idx);
    },
    onChange: (newAttrs) => {
      const objs = objects.slice();
      objs[idx] = newAttrs;
      setObjects(objs);
    },
    text: obj.type === "link" ? (obj.text ? obj.text : obj.url) : undefined,
    url: obj.type === "link" ? obj.url : undefined,
  };
};

export const setScaleStageEvent = (stageRef) => {
  stageRef.current.on("wheel", (e) => {
    let scaleBy = 1.01;
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
};

export const setInitialObjects = (selectedIssue, setObjects) => {
  if (selectedIssue) {
    const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;
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
            url: item.url,
          };
        }
      })
    );
  }
}