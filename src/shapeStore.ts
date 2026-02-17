import { PointCloudShape, ShapeName } from "./data";
import { getVoid, getShrine, getPurple, getNeutral, getRed, getBlue } from "./geometry";

export const COUNT = 20000
let currentShape: PointCloudShape = new PointCloudShape(COUNT);

const shrineShape = getShrine(COUNT);
const voidShape = getVoid(COUNT);
const purpleShape = getPurple(COUNT);
const redShape = getRed(COUNT);
const blueShape = getBlue(COUNT);
const neutralShape = getNeutral(COUNT);

export function getCurrentShape() {
  return currentShape;
}

export function setShape(name: ShapeName) {
  switch (name) {
    case "Malevolent Shrine":
      currentShape = shrineShape;
      break;
    case "Infinite Void":
      currentShape = voidShape;
      break;
    case "Purple":
      currentShape = purpleShape;
      break;
    case "Red":
      currentShape = redShape;
      break;
    case "Blue":
      currentShape = blueShape;
      break;
    case "Neutral":
      currentShape = neutralShape;
      break;
  }
}