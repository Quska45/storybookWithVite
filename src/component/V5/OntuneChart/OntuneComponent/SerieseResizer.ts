import { OntuneChartComponent } from "./OntuneChartComponent";

export class SerieseResizer extends OntuneChartComponent {

    constructor( dom: HTMLElement ){
        super( dom );

        console.log(dom.parentElement);
    };
}