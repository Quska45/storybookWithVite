export class OntuneProps {
    
};

export const OntuneChartDateUtil = {
    getAddZeroValue( time: number | string ){
        if( time < 10 ){
            time = '0' + time;
        };
        return time;
    },
};

export const OntuneChartColorUtil = {
    randomColorFactor() {
        return Math.floor(Math.random() * 255);
    },
    makeHexColor() {
        return Math.floor(Math.random() * 16777215).toString(16);;
    },
    rgbToHex ( rgbType ){ 
        /* 
        ** 컬러값과 쉼표만 남기고 삭제하기. 
        ** 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
        */ 
        var rgb = rgbType.replace( /[^%,.\d]/g, "" ).split( "," ); 
        
        rgb.forEach(function (str, x, arr){ 
        
            /* 컬러값이 "%"일 경우, 변환하기. */ 
            if ( str.indexOf( "%" ) > -1 ) str = Math.round( parseFloat(str) * 2.55 ); 
            
            /* 16진수 문자로 변환하기. */ 
            str = parseInt( str, 10 ).toString( 16 ); 
            if ( str.length === 1 ) str = "0" + str; 
            
            arr[ x ] = str; 
        }); 
        
        return "#" + rgb.join( "" ); 
    },
    hexToRgb ( hexType ){ 
        /* 맨 앞의 "#" 기호를 삭제하기. */ 
        var hex = hexType.trim().replace( "#", "" ); 
        
        /* rgb로 각각 분리해서 배열에 담기. */ 
        var rgb = ( 3 === hex.length ) ? 
            hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
        
        rgb.forEach(function (str, x, arr){     
            /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */ 
            if ( str.length == 1 ) str = str + str; 
            
            /* 10진수로 변환하기. */ 
            arr[ x ] = parseInt( str, 16 ); 
        }); 
        
        return "rgb(" + rgb.join(", ") + ")"; 
    } 
};

const getOrCreateTooltip = (chart) => {
    let tooltipEl: HTMLElement = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
        tooltipEl.style.height = '200px';
        tooltipEl.style.overflow = 'auto';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = '0';

        const th = document.createElement('th');
        th.style.borderWidth = '0';
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '5px';
            span.style.width = '5px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = '0';

            const td = document.createElement('td');
            td.style.borderWidth = '0';

            const text = document.createTextNode(body);

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};