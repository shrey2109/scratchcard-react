import React, { ModifierKey, useEffect, useState } from 'react'

type PropsType = {
  data: any,
  variant: string,
  handleCoverScratched: () => void
}

type EventTypes = {
  mouse: {
    down: string;
    move: string;
    up: string;
  };
  touch: {
    down: string;
    move: string;
    up: string;
  };
  [key: string]: {
    down: string;
    move: string;
    up: string;
  };
};



const ScratchCard = ({data, variant, handleCoverScratched}: PropsType) => {
    const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [coverRemoved, setCoverRemoved] = useState(false);

  useEffect(() => {
    const canvasElement = document.getElementById("scratch") as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext("2d");
    const coverArea = canvasElement.width * canvasElement.height;
    const eventTypes: EventTypes = {
      mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
      },
      touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
      },
    };

    const initializeCanvas = () => {
      const gradient = canvasContext?.createLinearGradient(0, 0, 135, 135);
      let color1 = "",
        color2 = "";
      if (variant === "blue") {
        color1 = "#2c67f2";
        color2 = "#62cff4";
      } else if (variant === "green") {
        color1 = "#53db97";
        color2 = "#0695b6";
      } else {
        color1 = "#d63031";
        color2 = "#fdcb6e";
      }
      gradient?.addColorStop(0, color1);
      gradient?.addColorStop(1, color2);
      if(canvasContext && gradient){
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvasElement?.width, canvasElement?.height);
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let deviceType = "";

    const checkIfTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
      } catch (e) {
        deviceType = "mouse";
        return false;
      }
    };

    const getMouseCoordinates = (event: MouseEvent | TouchEvent) => {
      const touch = 'touches' in event ? (event as TouchEvent).touches[0] : event as MouseEvent;
      mouseX = touch.pageX - canvasElement.getBoundingClientRect().left;
      mouseY = touch.pageY - canvasElement.getBoundingClientRect().top;
    };
    

    const handleDown = (event: any) => {
      isDragging = true;
      getMouseCoordinates(event);
      scratch(mouseX, mouseY);
    };

    const handleMove = (event: any) => {
      if (deviceType === "mouse") event.preventDefault();
      if (isDragging) {
        getMouseCoordinates(event);
        scratch(mouseX, mouseY);
      }
    };

    const handleUp = () => {
      isDragging = false;
      checkScratchedPercentage();
    };

    const checkScratchedPercentage = () => {
      if(canvasContext){
        const imageData = canvasContext.getImageData(0, 0, canvasElement?.width, canvasElement?.height).data;
        let scratchedPixels = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          // Check if the pixel is scratched (transparent)
          if (imageData[i + 3] === 0) {
            scratchedPixels++;
          }
        }
        const currentScratchedPercentage = (scratchedPixels / coverArea) * 100;
        setScratchedPercentage(currentScratchedPercentage);
        if (currentScratchedPercentage >= 60) {
          // Remove the cover
          setCoverRemoved(true);
          handleCoverScratched();
        }
      }
    };

    checkIfTouchDevice();

    canvasElement?.addEventListener(eventTypes[deviceType].down, handleDown);
    canvasElement?.addEventListener(eventTypes[deviceType].move, handleMove);
    canvasElement?.addEventListener(eventTypes[deviceType].up, handleUp);

    const scratch = (x: number, y: number) => {
      if(canvasContext){
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.beginPath();
        canvasContext.arc(x, y, 22, 0, 2 * Math.PI);
        canvasContext.fill();
      } 
    };

    initializeCanvas();

    return () => {
      canvasElement?.removeEventListener(
        eventTypes[deviceType].down,
        handleDown
      );
      canvasElement?.removeEventListener(
        eventTypes[deviceType].move,
        handleMove
      );
      canvasElement?.removeEventListener(eventTypes[deviceType].up, handleUp);
    };
  }, []);

  return (
    <div className="container">
      <div className="base">
        <h4>{data}</h4>
      </div>
      {!coverRemoved && <canvas id="scratch" width="200" height="200"></canvas>}
      {coverRemoved && <div>Cover Removed!</div>}
      <div>Scratched: {scratchedPercentage.toFixed(2)}%</div>
    </div>
  );
}

export { ScratchCard }