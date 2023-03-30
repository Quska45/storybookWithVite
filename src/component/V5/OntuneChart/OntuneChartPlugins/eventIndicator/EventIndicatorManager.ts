import type { EventIndicator } from "./EventIndicator";

export class EventIndicatorManager {
    indicator: EventIndicator[];

    constructor(){
    };

    add( indicator: EventIndicator ){
        this.indicator.push( indicator );
    };
};