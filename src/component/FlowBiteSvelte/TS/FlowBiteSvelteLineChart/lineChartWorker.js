function getRandomIntInclusive( min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

onmessage = function( event ){
    const { chartData, label } = event.data;

    chartData.labels.push(label);
    chartData.labels.shift();
    chartData.datasets.forEach((dataset, i) => {
        dataset.data.push(getRandomIntInclusive(0,100));
        dataset.data.shift();
    });

    this.postMessage( chartData );
};