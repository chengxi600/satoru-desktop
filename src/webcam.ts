/**
 * Enables webcam, initializes rendering loop to draw hand landmarks 
 * and connectors onto webcam canvas. Media pipe hand detection on loop. 
 * 
 */
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { drawCustomConnectors, drawCustomLandmarks, process_landmarks_shape } from "./utils";
import { setTechnique } from "./technique_manager";

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    let handLandmarker: HandLandmarker;
    const videoContainer = document.getElementById("video_container") as HTMLElement;

    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task"
          },
          runningMode: "VIDEO",
          numHands: 2
        });
      videoContainer.classList.remove("invisible");
    };

    createHandLandmarker();

    const video = document.getElementById("webcam") as HTMLVideoElement;
    const canvasElement = document.getElementById(
      "output_canvas"
    ) as HTMLCanvasElement;
    const canvasCtx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    // check if webcam access is supported
    const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

    enableWebcam();

    let lastVideoTime = -1;
    let results: HandLandmarkerResult | undefined = undefined;

    async function renderLoop() {

      if (!handLandmarker) {
        console.log("Wait! objectDetector not loaded yet.");
        return;
      }

      canvasElement.style.width = video.videoWidth.toString();
      canvasElement.style.height = video.videoHeight.toString();
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;

      let startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = handLandmarker.detectForVideo(video, startTimeMs);
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      if (results && results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawCustomConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5
          });
          drawCustomLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2, radius: 4 });
        }
        setTechnique(process_landmarks_shape(results));
      }
      canvasCtx.restore();

      window.requestAnimationFrame(renderLoop);
    }

    function enableWebcam() {
      if (!hasGetUserMedia()) {
        console.warn("getUserMedia() is not supported by your browser");
      }

      const constraints = {
        video: true
      };

      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", renderLoop);
      });
    }
  });
}