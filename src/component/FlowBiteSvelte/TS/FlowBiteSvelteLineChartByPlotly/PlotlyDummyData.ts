const hour = 22;
const min = 0;
const sec = 0;

export function getPlotlyXDummyData( term ){
    const xArr = [];

    for( let i=0; i<term; ++i ){
        let timeStr = '';
        const temp = i % 60;
        const secStr = addZero( temp );
        const minStr = addZero( parseInt((i/60).toString()) );
        
        timeStr = `${hour}:${minStr}:${secStr}`;
    
        xArr.push( timeStr );
    };

    return xArr;
};

export function getPlotlyYDummyData( term ): number[]{
    const yArr = [];

    for( let i=0; i<term; ++i ){
        yArr.push(Math.random() * 100);
    };

    return yArr;
};

export function randomColorFactor() {
    return Math.floor(Math.random() * 255);
}

function addZero( time ){
    if( time < 10 ){
        time = '0' + time;
    };
    return time;
};