import { INoiseClass, ISettings } from "../noise.abstract"
import { View } from "./view"
interface ISimpleNoiseSettings extends ISettings {

}
export default class SimpleNoise implements INoiseClass {
    settings: ISimpleNoiseSettings = {}
    getNoise(size: number) {
        let count = 2 ** size + 1
        let noise: number[][] = []
        for (let i = 0; i < count; i++) {
            noise.push([])
            for (let j = 0; j < count; j++) {
                noise[i].push(Math.random())
            }
        }
        return noise
    }

    getSettingsView() {
        return <View noise={this} />
    }
}