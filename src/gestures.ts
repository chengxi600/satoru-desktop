import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { ShapeName } from "./data";

export function process_landmarks_shape(results: HandLandmarkerResult): ShapeName {
  if (is_shrine(results)) {
    return "Malevolent Shrine";
  } else if(is_void(results)){
    return "Infinite Void";
  } else if (is_red(results)) {
    return "Red";
  }else if (is_purple(results)) {
    return "Purple";
  } else if (is_blue(results)) {
    return "Blue";
  } else {
    return "Neutral"
  }
}

function is_shrine(results: HandLandmarkerResult): boolean {
  // two hands
  if (results.handedness.length < 2) {
    return false;
  }

  let shrine = true;

  for (let i = 0; i < results.handedness.length; i++) {
    const landmarks = results.landmarks[i];
    const handedness = results.handedness[i][0].categoryName;

    const fingertipIndices = [8, 12, 16, 20]; // index, middle, ring, pinky
    const thumb = 4;
    const wrist = 0;

    const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
    const isRightOf = (i: number, j: number) => landmarks[i].x > landmarks[j].x;
    const isLeftOf = (i: number, j: number) => landmarks[i].x < landmarks[j].x;

    const isMirroredLeftHand = handedness === "Right";

    const horizontalCheck = isMirroredLeftHand ? isLeftOf : isRightOf;

    const allFingersAboveWrist = fingertipIndices.every(i => isAbove(i, wrist));
    const allFingersOnCorrectSide = fingertipIndices.every(i => horizontalCheck(i, wrist));
    const thumbCorrectSide = horizontalCheck(thumb, wrist);

    shrine = shrine &&
         allFingersAboveWrist &&
         allFingersOnCorrectSide &&
         thumbCorrectSide;
  }
  return shrine;
}

function is_red(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const fingertipIndices = [12, 16, 20]; // middle, ring, pinky
  const thumb = 4;
  const indexTip = 8;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isLeftOf = (i: number, j: number) => landmarks[i].x < landmarks[j].x;

  const indexAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(indexTip, i));

  const allFingersLeftOfIndex = [thumb, ...fingertipIndices].every(i => isLeftOf(i, indexTip));

  return indexAboveAllFingers && allFingersLeftOfIndex;
}

function is_blue(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const fingertipIndices = [12, 16, 20]; // middle, ring, pinky
  const thumb = 4;
  const indexTip = 8;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;
  const isRightOf = (i: number, j: number) => landmarks[i].x > landmarks[j].x;

  const indexAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(indexTip, i));

  const allFingersRightOfIndex = [thumb, ...fingertipIndices].every(i => isRightOf(i, indexTip));

  return indexAboveAllFingers && allFingersRightOfIndex;
}

function is_void(results: HandLandmarkerResult): boolean {
  // only one hand
  if (results.handedness.length !== 1) {
    return false;
  }

  const landmarks = results.landmarks[0];

  const fingertipIndices = [16, 20]; // middle, ring, pinky
  const thumb = 4;
  const indexTip = 8;
  const middleTip = 12;

  const isAbove = (i: number, j: number) => landmarks[i].y < landmarks[j].y;

  const indexAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(indexTip, i));
  const middleAboveAllFingers = [thumb, ...fingertipIndices].every(i => isAbove(middleTip, i));

  return indexAboveAllFingers && middleAboveAllFingers;
}

function is_purple(results: HandLandmarkerResult): boolean {
  if (results.handedness.length !== 1) return false;

  const landmarks = results.landmarks[0];
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];

  // Distance between thumb and index
  const dx = thumbTip.x - indexTip.x;
  const dy = thumbTip.y - indexTip.y;
  const dz = thumbTip.z - indexTip.z;
  const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

  // Optional: check if middle, ring, pinky are somewhat extended
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const fingersExtended = 
    middleTip.y < landmarks[0].y && // above wrist
    ringTip.y < landmarks[0].y &&
    pinkyTip.y < landmarks[0].y;

  // Threshold for pinch (tune between 0.03-0.08 depending on normalized coords)
  const PINCH_THRESHOLD = 0.05;

  return distance < PINCH_THRESHOLD && fingersExtended;
}
