import type { IEventDispacher } from "../OntuneChartType";

export const TitleChanger: IEventDispacher = {
    id: 'TitleChanger',
    dispatchEvent: () => {
        console.log(123);
    }
};