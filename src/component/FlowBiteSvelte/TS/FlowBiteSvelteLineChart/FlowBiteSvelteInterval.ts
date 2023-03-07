const window = self;

export class FlowBiteDataInterval {
    intervalTick: number;
    intervalTime: number;
    intervalFunction: Function;

    constructor(){
    };
    
    set( intervalTime, intervalFunction ){
        let dataInterval = this;
        
        dataInterval.intervalTime = intervalTime;
        dataInterval.intervalFunction = intervalFunction;
    }

    setIntervalTime( intervalTime: number ){
        let dataInterval = this;
        
        dataInterval.intervalTime = intervalTime;
    }

    setIntervalFunction( intervalFunction ){
        let dataInterval = this;
        
        dataInterval.intervalFunction = intervalFunction;
    }

    /**
     * startFunction에 인자로 들어오는 모든 값은 interval 안에서 실행되는 콜백의 인자로 들어간다.
     */
    startFunction(){
        let dataInterval = this;

        if( !dataInterval.intervalTime ){
            return;
        }
        
        if( !dataInterval.intervalFunction ){
            return;
        }
        
        if( dataInterval.intervalTick ){
            return;
        }

        dataInterval.intervalTick = window.setInterval(() => {
            dataInterval.intervalFunction.apply( null, arguments );
        }, dataInterval.intervalTime);
    }
    
    stop(){
        let dataInterval = this;
        
        if( !dataInterval.intervalTick ){
            return;
        };
        
        dataInterval.intervalTick = null;
        window.clearInterval( dataInterval.intervalTick );
    }
}