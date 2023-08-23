import { INoiseClass, ISettings } from "../noise.abstract";
import PerlinNoise from "../perlin/perlin.noise";
import { View } from "./view";
interface IDiamodSquareNoiseSettings extends ISettings {
    magnitude: number
}

export default class DiamondSquareNoise implements INoiseClass {
    settings: IDiamodSquareNoiseSettings = {
        magnitude: 9
    }
    size!: number;
    corners: number[] = [0, 0, 0, 0];
    mag: number = this.settings.magnitude;
    width!: number
    noise!: number[][]


    private setСorners() {
        this.noise[0][0] = this.corners[0];
        this.noise[0][this.width - 1] = this.corners[1];
        this.noise[this.width - 1][0] = this.corners[2];
        this.noise[this.width - 1][this.width - 1] = this.corners[3];
    }

    private fillArray() {
        this.noise = new Array(this.width);
        for (var i = 0; i < this.width; i++) {
            this.noise[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++) {
                this.noise[i][j] = 0;
            }
        }
    }

    private diamondStep(dist: number) {
        var half = dist / 2;

        for (var i = 0; i < this.width - dist; i += dist) {
            for (var j = 0; j < this.width - dist; j += dist) {
                var mid = i + half;
                var mid2 = j + half;
                var i2 = i + dist;
                var j2 = j + dist;
                this.noise[mid][mid2] = (Math.random() - 0.5) * this.mag + ((this.noise[i][j] + this.noise[i2][j] + this.noise[i][j2] + this.noise[i2][j2]) / 4);
            }
        }
    }

    private squareStep(dist: number) {
        var mid = dist / 2;
        var i, j;
        var oddIteration = true;
        for (i = 0; i < this.width; i += mid) {
            j = (oddIteration) ? mid : 0;
            for (; j < this.width; j += dist) {
                this.noise[i][j] = this.avgDiamond(i, j, mid) + (Math.random() - 0.5) * this.mag;
            }
            oddIteration = !oddIteration;
        }
    }

    private avgDiamond(x: number, y: number, half: number) {
        // console.log("diamond: ", x, y);
        var tot = 0;
        var count = 0;

        if (x + half < this.width) {
            tot += this.noise[x + half][y]; count++;
        }
        if (x - half >= 0) {
            tot += this.noise[x - half][y]; count++;
        }
        if (y + half < this.width) {
            tot += this.noise[x][y + half]; count++;
        }
        if (y - half >= 0) {
            tot += this.noise[x][y - half]; count++;
        }

        return tot / count;
    }

    private noise_(size: number) {
        for (var i = 1 << size; i > 1; i = i >> 1) {
            this.diamondStep(i);
            this.squareStep(i);
            this.mag *= 0.6;
        }
    }

    getNoise(size: number) {
        this.width = (1 << size) + 1;
        this.noise = new Array(this.width)
        this.fillArray()
        this.setСorners()
        this.noise_(size)
        this.mag = this.settings.magnitude


        return this.noise
    }

    getSettingsView() {
        return <View noise={this} />
    }
}