import { INoiseClass } from "../noise.abstract";
import { View } from "./view";

export default class DiamondSquareNoise implements INoiseClass {
    size!: number;
    corners: number[] = [1, 1, 1, 1];
    init_mag: number = 4;
    mag: number = this.init_mag;
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

    private noise_() {
        for (var i = 1 << this.size; i > 1; i = i >> 1) {
            this.diamondStep(i);
            this.squareStep(i);
            this.mag *= 0.6;
        }

        var max = 0
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.noise[i][j] > max) {
                    max = this.noise[i][j]
                }
            }
        }

        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.width; j++) {
                this.noise[i][j] /= max
            }
        }
    }

    getNoise(size: number) {
        this.width = (1 << size) + 1;
        this.noise = new Array(this.width)
        this.fillArray()
        this.setСorners()
        this.noise_()
        this.mag = this.init_mag

        return this.noise
    }

    getView() {
        return <View noise={this} />
    }
}