import React, { useState, useEffect } from "react";
import { faceEmojis } from "../utils/emojis";
import { getRandomInt } from "./../utils/utils";

const MagicText = ({ children }) => {
  const [currentString, setCurrentString] = useState("");

  useEffect(() => {
    let randomCharPosition = getRandomInt(0, children.length);
    let randomEmoji = faceEmojis[getRandomInt(0, faceEmojis.length)];
    console.log(randomEmoji)
    let newString =
      children.slice(0, randomCharPosition) +
      randomEmoji +
      children.slice(randomCharPosition + randomEmoji.length);

    setCurrentString(newString);
  }, []);

  return <p>{currentString}</p>;
};

export default MagicText;
