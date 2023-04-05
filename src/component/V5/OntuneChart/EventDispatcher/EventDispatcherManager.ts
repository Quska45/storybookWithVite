import { createEventDispatcher } from 'svelte'
import type { IEventDispacher, IEventDispacherIndexMap } from '../OntuneChartType';

export class EventDispatcherManager {
    svelteDispatcher = createEventDispatcher();
    eventDispatchers: Function[];
    eventDispatcherIndexMap: IEventDispacherIndexMap

    constructor(){
    };

    addEventDispatcher( eventDispacher: IEventDispacher ){
        const event = () => {
            
        };
    };
};