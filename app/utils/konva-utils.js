export const onTransformEnd = (e, shapeRef, onChange, shapeProps) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const node = shapeRef.current;
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset it back
  node.scaleX(1);
  node.scaleY(1);
  onChange({
    ...shapeProps,
    x: node.x(),
    y: node.y(),
    // set minimal value
    width: Math.max(5, node.width() * scaleX),
    height: Math.max(node.height() * scaleY),
  });
};

export const boundBoxFunc = (oldBox, newBox) => {
  // limit resize
  if (newBox.width < 5 || newBox.height < 5) {
    return oldBox;
  }
  return newBox;
};

export const checkDeselect = (e, selectShape) => {
  // deselect when clicked on empty area
  const clickedOnEmpty = e.target === e.target.getStage();
  if (clickedOnEmpty) {
    selectShape(null);
  }
};
