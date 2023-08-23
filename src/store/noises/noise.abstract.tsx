export interface INoiseClass {
    settings: ISettings
    getNoise: (size: number) => number[][]
    getSettingsView: () => JSX.Element
}

export interface ISettings {

}