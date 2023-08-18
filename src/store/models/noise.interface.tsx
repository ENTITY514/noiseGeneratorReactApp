import DiamondSquareNoise from "../noises/diamond/diamondSquare.noise"
import PerlinNoise from "../noises/perlin/perlin.noise"
import SimpleNoise from "../noises/simple/simple.noise"

export enum NOISES {
    SIMPLENOISE,
    PERLINNOISE,
    DIAMONDSQUARENOISE
}

export interface INoiseReducer {
    noise: number[][]
    size: number
    activeNoise: NOISES
    noiseObject: DiamondSquareNoise | SimpleNoise | PerlinNoise
}