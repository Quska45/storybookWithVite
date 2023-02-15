import * as d3 from "d3";
import type { ChartData, D3ChartData } from "../FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData";
import type { TDomain } from "./ChartByD3Type";

export class FlowBiteSvelteLineChartByD3 {
    vis: HTMLElement;
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>;
    xScale: d3.ScaleContinuousNumeric<number, number, never>;
    yScale: d3.ScaleContinuousNumeric<number, number, never>;
    width: number;
    height: number;
    xDomain: TDomain;
    yDomain: TDomain;
    data: D3ChartData;
    margin = {
        top : 20,
        right: 20,
        bottom: 30,
        left: 30
    }

    constructor( vis: HTMLElement, xDomain: TDomain, yDomain: TDomain, data: D3ChartData ){
        this.vis = vis;
        this.xDomain = xDomain;
        this.yDomain = yDomain;
        this.data = data;
    }
    
    init(){
        const chart = this;

        // init Scale
        chart.xScale = d3.scaleLinear().domain([chart.xDomain.min, chart.xDomain.max]);
        chart.yScale = d3.scaleLinear().domain([chart.yDomain.min, chart.yDomain.max]);

        // make empty visual dom
        d3.select( chart.vis ).html( null );
    
        // determine width & height
        let boundingBox = d3.select( chart.vis ).node().getBoundingClientRect();
        chart.width = boundingBox.width - chart.margin.left - chart.margin.right;
        chart.height = boundingBox.height - chart.margin.top - chart.margin.bottom;

        // range scale by width, height
        chart.xScale.range([0, chart.width]);
        chart.yScale.range([chart.height, 0]);
    }

    draw(): void {
        const chart = this;
        // make svg and group translated by the margin
        chart.svg = d3.select(chart.vis)
            .append( 'svg')
            .attr( 'width', chart.width + chart.margin.left + chart.margin.right )
            .attr( 'height', chart.height + chart.margin.top + chart.margin.bottom )
            .append( 'g' )
            .attr( 'transform', `translate(${[chart.margin.left, chart.margin.top]})` )

        // draw x and y axes
        chart.svg.append("g")
            .attr("transform", `translate(${[0, chart.height]})`)
            .call(d3.axisBottom( chart.xScale ));
        chart.svg.append("g")
            .call(d3.axisLeft( chart.yScale ));
        
        // draw data points
        chart.svg.append('g').selectAll('circle')
            .data(chart.data.chartData)
            .enter()
            .append('circle')
            .attr('cx', function (d) { 
                return chart.xScale(d.x); 
            })
            .attr('cy', function (d) { 
                return chart.yScale(d.y); 
            })
            .attr('r', 7)
            .style('fill', '#ff3e00')
            .style('fill-opacity', '0.5')
            .style('stroke', '#ff3e00');
    }
}