import { INoiseClass, ISettings } from "../noise.abstract";
import { View } from "./view";

interface IPerlinNoiseSettings extends ISettings {
    octavCount: number
    persistance: number
    scale: number
}
export default class PerlinNoise implements INoiseClass {
    settings: IPerlinNoiseSettings = {
        octavCount: 1,
        persistance: 0,
        scale: 1
    }
    table: number[] = []
    constructor() {
        this.table = this.getTable()
    }

    Lerp(a: number, b: number, t: number) {
        // return a * (t - 1) + b * t; можно переписать с одним умножением (раскрыть скобки, взять в другие скобки):
        return a + (b - a) * t;
    }

    GetPseudoRandomVector(x: number, y: number) {
        let t: number = Number(String(Math.round(x * 3498756347 + y * 8437564376 + 947385689)).slice(-5));

        let v = this.table[t]

        switch (v) {
            case 0: return [1, 0];
            case 1: return [-1, 0];
            case 2: return [0, 1];
            default: return [0, -1]
        }
    }

    Dot(a: number[], b: number[]) {
        return a[0] * b[0] + a[1] * b[1];
    }

    QunticCurve(t: number) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    PerlNoise(fx: number, fy: number) {
        // сразу находим координаты левой верхней вершины квадрата
        let left: number = Math.floor(fx);
        let top: number = Math.floor(fy);

        // а теперь локальные координаты точки внутри квадрата
        let pointInQuadX: number = fx - left;
        let pointInQuadY: number = fy - top;


        // извлекаем градиентные векторы для всех вершин квадрата:
        let topLeftGradient: number[] = this.GetPseudoRandomVector(left, top);
        let topRightGradient: number[] = this.GetPseudoRandomVector(left + 1, top);
        let bottomLeftGradient: number[] = this.GetPseudoRandomVector(left, top + 1);
        let bottomRightGradient: number[] = this.GetPseudoRandomVector(left + 1, top + 1);

        // вектора от вершин квадрата до точки внутри квадрата:
        let distanceToTopLeft: number[] = [pointInQuadX, pointInQuadY];
        let distanceToTopRight: number[] = [pointInQuadX - 1, pointInQuadY];
        let distanceToBottomLeft: number[] = [pointInQuadX, pointInQuadY - 1];
        let distanceToBottomRight: number[] = [pointInQuadX - 1, pointInQuadY - 1];


        let tx1: number = this.Dot(distanceToTopLeft, topLeftGradient);
        let tx2: number = this.Dot(distanceToTopRight, topRightGradient);
        let bx1: number = this.Dot(distanceToBottomLeft, bottomLeftGradient);
        let bx2: number = this.Dot(distanceToBottomRight, bottomRightGradient);

        // готовим параметры интерполяции, чтобы она не была линейной:
        pointInQuadX = this.QunticCurve(pointInQuadX);
        pointInQuadY = this.QunticCurve(pointInQuadY);

        // собственно, интерполяция:
        let tx: number = this.Lerp(tx1, tx2, pointInQuadX);
        let bx: number = this.Lerp(bx1, bx2, pointInQuadX);
        let tb: number = this.Lerp(tx, bx, pointInQuadY);

        // возвращаем результат:
        return tb;
    }

    OctavNoise(fx: number, fy: number, octaves: number, persistence: number) {
        let amplitude: number = 10; // сила применения шума к общей картине, будет уменьшаться с "мельчанием" шума
        // как сильно уменьшаться - регулирует persistence
        let max: number = 0; // необходимо для нормализации результата
        let result: number = 0; // накопитель результата

        while (octaves-- > 0) {
            max += amplitude;
            result += this.PerlNoise(fx, fy) * amplitude;
            amplitude *= persistence;
            fx *= 2; // удваиваем частоту шума (делаем его более мелким) с каждой октавой
            fy *= 2;
        }

        return result / max;
    }

    getTable = () => {
        let table: number[] = []
        for (let i = 0; i < 100000; i++) {
            table.push(Math.round(Math.random() * 4))
        }
        return table
    }

    getNoise(size: number) {
        let width = (1 << size) + 1;
        let noise = new Array(width)

        for (var i = 0; i < width; i++) {
            noise[i] = new Array(width);
            for (var j = 0; j < width; j++) {
                noise[i][j] = this.OctavNoise(i / this.settings.scale, j / this.settings.scale, this.settings.octavCount, this.settings.persistance)
            }
        }
        return noise;
    }

    getSettingsView() {
        return <View noise={this} />
    }
}