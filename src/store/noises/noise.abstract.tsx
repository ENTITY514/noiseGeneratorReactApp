export interface INoiseClass {
    getNoise: (size: number) => number[][]
    getView: () => JSX.Element
}