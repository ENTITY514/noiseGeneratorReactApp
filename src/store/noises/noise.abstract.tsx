export interface INoiseClass {
    getNoise: (size: number) => number[][]
    getSettingsView: () => JSX.Element
}