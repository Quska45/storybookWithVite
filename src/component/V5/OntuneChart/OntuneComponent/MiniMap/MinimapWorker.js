onmessage = function( event ){
    const { offScreenCanvas, config } = event.data;
    console.log( offScreenCanvas );
    console.log( config );
    console.log( 'minimapWorker 실행됨' );
};