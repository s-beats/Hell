import { Judgeable } from "./interface";
import { Point } from "./point";
import { Karmas } from "./karmas";

export class Judge implements Judgeable {
    private static instance: Judge;
    element: HTMLDivElement = document.querySelector<HTMLDivElement>('.judge')!;
    private constructor() {
        this.element.addEventListener('click', this.clickEventHandler.bind(this))
    };
    clickEventHandler(): void {
        this.element.classList.toggle('judge--active');
        if (this.element.classList.contains('judge--active')) {
            this.displayJudgement();
            this.element.textContent = "もう一度やり直す";
        } else {
            const karmas = Karmas.getInstance();
            karmas.remove();
            this.element.textContent = "判定する";
            document.querySelector('.result')!.classList.remove('result--display');
        }
    };
    get resultPoint() {
        const point = Point.getInstance();
        return point.totalpoint;
    }
    get resultPlace(): string {
        const resultPoint = this.resultPoint;        
        if (resultPoint < -15) {
            return "阿鼻地獄";
        }
        if (resultPoint < -10) {
            return "叫喚地獄";
        }
        if (resultPoint === -10) {
            return "等活地獄";
        }
        return "地獄以外";
    }
    displayJudgement(): void {
        document.querySelector('.result__point')!.textContent = String(this.resultPoint);
        document.querySelector('.result__place')!.textContent = this.resultPlace;
        document.querySelector('.result')!.classList.add('result--display');
    };
    static getInstance() {
        if (!Judge.instance) {
            Judge.instance = new Judge();
        }
        return Judge.instance;
    }
}