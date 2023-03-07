function addZero( time ){
    if( time < 10 ){
        time = '0' + time;
    };
    return time;
};
    
onmessage = async function( event ){
    const { data, count, layout } = event.data;

    let date = new Date();
    let hour = addZero(date.getHours());
    let min = addZero(date.getMinutes());
    let sec = addZero(date.getSeconds());
    
    for(let i=0; i<count; ++i){
        data[i].x.push(`${hour}:${min}:${sec}`);
        data[i].y.push(Math.random()*100);
    }

    this.postMessage( data );
};