import type { Vector } from "../../CanvasEngine/Core/Math/Vector";
import type { Object2D } from "../../CanvasEngine/Core/Object2D/Object2D";
import type { TDataset } from "../Common/Data";

export class DataSet {
    label: string;
    data: number[];
    texts: Text[];
    fill: boolean;
    borderColor: string;
    tension: number;

    constructor( dataset: TDataset ){
        this.label = dataset.label;
        this.fill = dataset.fill;
        this.borderColor = dataset.borderColor;
        this.tension = dataset.tension;
        this.data = dataset.data;
    };

    addText( text: Text ){
        this.texts.push( text );

        return text;
    };
};