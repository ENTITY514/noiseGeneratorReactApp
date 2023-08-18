import { View } from "./view"

export default class SimpleNoise {
    getNoise(size: number) {
        let count = size ** 2 + 1
        let noise: number[][] = []
        for (let i = 0; i < count; i++) {
            noise.push([])
            for (let j = 0; j < count; j++) {
                noise[i].push(Math.random())
            }
        }
        return noise
    }

    getView() {
        return <View noise={this} />
    }
}