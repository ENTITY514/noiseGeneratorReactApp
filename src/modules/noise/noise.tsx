import React from "react";
import style from "./style.module.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { NoiseSlice } from "../../store/reducers/noise.reducer";

function Noise() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ctx, setContext] = React.useState<CanvasRenderingContext2D | null>(null)

  const dispatch = useAppDispatch()
  const actions = NoiseSlice.actions
  const state = useAppSelector(state => state.NoiseSlice)

  React.useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      setContext(canvasRef.current.getContext("2d"))
      canvasRef.current.width = 500
      canvasRef.current.height = 500
      if (ctx) {
        generate()
      }
    }
  }, [canvasRef.current, state.noise])

  const generate = () => {
    if (ctx) {

      let сellCount = 2 ** state.size + 1;
      let cellSize = 500 / сellCount;

      for (let i = 0; i < сellCount; i++) {
        for (let j = 0; j < сellCount; j++) {
          let r = (state.noise[i][j]) * 255;
          ctx.fillStyle = "rgb(" + r + "," + r + "," + r + ")";
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  React.useEffect(() => { generate() }, [state.noise, state.size])

  return (
    <div className={style.container} ref={containerRef}>
      <canvas ref={canvasRef}>

      </canvas>
    </div>
  );
}

export default Noise;
