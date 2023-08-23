import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INoiseReducer, NOISES } from "../models/noise.interface";
import SimpleNoise from "../noises/simple/simple.noise";
import PerlinNoise from "../noises/perlin/perlin.noise";
import DiamondSquareNoise from "../noises/diamond/diamondSquare.noise";

const simpleNoise = new SimpleNoise()
const perlinNoise = new PerlinNoise()
const diamondSquareNoise = new DiamondSquareNoise()

let initialState: INoiseReducer = {
    noise: diamondSquareNoise.getNoise(8),
    size: 8,
    activeNoise: NOISES.DIAMONDSQUARENOISE,
    noiseObject: diamondSquareNoise,
    normalize: false
}


export const NoiseSlice = createSlice({
    name: 'noiseSlice',
    initialState,
    reducers: {
        setNoiseType: (state, action: PayloadAction<NOISES>) => {
            state.activeNoise = action.payload
            switch (state.activeNoise) {
                case NOISES.SIMPLENOISE:
                    state.noiseObject = simpleNoise
                    break;
                case NOISES.PERLINNOISE:
                    state.noiseObject = perlinNoise
                    break;
                case NOISES.DIAMONDSQUARENOISE:
                    state.noiseObject = diamondSquareNoise
                    break;

                default:
                    break;
            }
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload
        },
        setNormalize: (state, action: PayloadAction<boolean>) => {
            state.normalize = action.payload
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
            if (state.normalize) {
                NormalizeArray(state.noise)
            }
        },

    }
})

export default NoiseSlice.reducer;


const NormalizeArray = (array: number[][]) => {
    var max = 0

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i][j] > max) {
                max = array[i][j]
            }
        }
    }

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            array[i][j] /= max
        }
    }
}