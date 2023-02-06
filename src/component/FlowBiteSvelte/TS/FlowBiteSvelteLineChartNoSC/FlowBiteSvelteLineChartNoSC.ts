export function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset, i) => {
        dataset.data.push(data + i);
    });
    chart.update();
};

export function addRandomData(chart, label) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset, i) => {
        dataset.data.push(getRandomIntInclusive(0,101));
    });
    chart.update();
};

export function removeData(chart) {
    chart.data.labels.shift();
    console.log(chart.data.labels);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function currentTime(){
    let today = new Date();
    let dateForm = today.getFullYear() + ' ' + (today.getMonth() + 1) + ' ' + today.getDate() + ' ' + today.getHours() + ' ' + today.getMinutes() + ' ' + today.getSeconds();
    return dateForm;
}

export let zoom = {
    start ( chart ){
    
    },
    end ( chart ){

    },
    reset( chart ){
        chart.resetZoom();
    }
}