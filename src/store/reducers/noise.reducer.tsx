import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INoiseReducer, NOISES } from "../models/noise.interface";
import SimpleNoise from "../noises/simple/simple.noise";
import PerlinNoise from "../noises/perlin/perlin.noise";
import DiamondSquareNoise from "../noises/diamond/diamondSquare.noise";

const simpleNoise = new SimpleNoise()
const perlinNoise = new PerlinNoise()
const diamondSquareNoise = new DiamondSquareNoise()

let initialState: INoiseReducer = {
    noise: simpleNoise.getNoise(4),
    size: 4,
    activeNoise: NOISES.SIMPLENOISE,
    noiseObject: simpleNoise
}

export const NoiseSlice = createSlice({
    name: 'noiseSlice',
    initialState,
    reducers: {
        setNoiseType: (state, action: PayloadAction<NOISES>) => {
            state.activeNoise = action.payload
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload
        },
        updateNoise: (state) => {
            switch (state.activeNoise) {
                case NOISES.SIMPLENOISE:
                    state.noise = simpleNoise.getNoise(state.size)
                    break;
                case NOISES.PERLINNOISE:
                    state.noise = perlinNoise.getNoise(state.size)
                    break;
                case NOISES.DIAMONDSQUARENOISE:
                    state.noise = diamondSquareNoise.getNoise(state.size)
                    break;

                default:
                    break;
            }
        },
    }
})

export default NoiseSlice.reducer;