import { Technique, TechniqueName } from "./techniques/base";
import { blue } from "./techniques/blue";
import { neutral } from "./techniques/neutral";
import { purple } from "./techniques/purple";
import { red } from "./techniques/red";
import { shrine } from "./techniques/shrine";
import { voidTechnique } from "./techniques/void";

let currentTechnique: Technique = neutral;


export function getCurrentTechnique() {
  return currentTechnique;
}

function fadeAudio(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number
) {
  const startVolume = audio.volume;
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audio.volume =
      startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      if (targetVolume === 0) {
        audio.pause();
      }
    }
  }

  requestAnimationFrame(tick);
}


export function setTechnique(name: TechniqueName) {
  // same technique
  if (currentTechnique.name === name) {
    return;
  }

  // switch to new technique
  fadeAudio(currentTechnique.audio, 0, 500);

  switch (name) {
    case TechniqueName.MalevolentShrine:
      currentTechnique = shrine;
      break;
    case TechniqueName.InfiniteVoid:
      currentTechnique = voidTechnique;
      break;
    case TechniqueName.Purple:
      currentTechnique = purple;
      break;
    case TechniqueName.Red:
      currentTechnique = red;
      break;
    case TechniqueName.Blue:
      currentTechnique = blue;
      break;
    case TechniqueName.Neutral:
      currentTechnique = neutral;
      break;
  }

  // Prep new audio
  currentTechnique.audio.volume = 0;
  currentTechnique.audio.currentTime = 0;
  currentTechnique.audio.play();

  fadeAudio(currentTechnique.audio, 0.6, 700);
}