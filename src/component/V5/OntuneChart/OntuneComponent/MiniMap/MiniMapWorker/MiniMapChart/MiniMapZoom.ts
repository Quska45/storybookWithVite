import { cacheTextureArray } from "pixi.js";
import type { TChartProperties } from "./MiniMapChart";

type TMinimapController = 'left' | 'right';

export class MiniMapZoom {
    controllerWidth = 5;
    controllerHeight = 60;

    /**
     * 미니맵에 현재 화면에 보이고 있는 mainChart영역을 그려주는 메서드
     * @param {TChartProperties} cp chart에서 자주 사용되는 타입에 대한 객체
     * @param {number} mainChartMinArea 현재 화면에 보이는 x축 영역의 최소 값
     * @param {number} mainChartMaxArea 현재 화면에 보이는 x축 영역의 최대 값
     * @returns {void}
     */
    drawArea( cp: TChartProperties, mainChartMinArea: number, mainChartMaxArea: number ){
        const ctx = cp.ctx;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(54, 162, 235, 0.5)';
        ctx.fillRect( 
            cp.xScale.getPixelForValue( mainChartMinArea ),
            cp.top,
            cp.xScale.getPixelForValue( mainChartMaxArea ) - cp.xScale.getPixelForValue( mainChartMinArea ),
            cp.height
        );
        cp.ctx.closePath();
        ctx.restore();
    };

    /**
     * 미니맵을 제어할 수 있도록 제공되는 왼쪽 버튼의 역할을 하는 객체를 그리는 메서드
     * @param {TChartProperties} cp chart에서 자주 사용되는 타입에 대한 객체
     * @param {number} mainChartMinArea 현재 화면에 보이는 x축 영역의 최소 값
     * @returns {void}
     */
    drawLeftController( cp: TChartProperties, mainChartMinArea: number ){
        this.drawController( cp, mainChartMinArea, 'left' );
    };

    /**
     * 미니맵을 제어할 수 있도록 제공되는 오른쪽 버튼의 역할을 하는 객체를 그리는 메서드
     * @param {TChartProperties} cp chart에서 자주 사용되는 타입에 대한 객체
     * @param {number} mainChartMinArea 현재 화면에 보이는 x축 영역의 최소 값
     * @returns {void}
     */
    drawRightController( cp: TChartProperties, mainChartMaxArea: number ){
        this.drawController( cp, mainChartMaxArea, 'left' );
    };

    /**
     * 미니맵을 제어할 수 있도록 제공되는 버튼의 역할을 하는 객체를 그리는 메서드
     * @param {TChartProperties} cp chart에서 자주 사용되는 타입에 대한 객체
     * @param {number} mainChartMinArea 현재 화면에 보이는 x축 영역의 최소 값
     * @param {TMinimapController} type 그려져야 하는 버튼이 왼쪽 인지 오른쪽인지에 대한 타입
     * @returns {void}
     */
    private drawController( cp: TChartProperties, mainChartArea: number, type: TMinimapController ){
        const ctx = cp.ctx;
        const controllerWidth = this.controllerWidth;
        const controllerHeight = this.controllerHeight;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        // ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
        // ctx.fillStyle = '#FFF';
        ctx.lineWidth = 2;
        // console.log('cp.xScale.getPixelForValue( mainChartArea ));',cp.xScale.getPixelForValue( mainChartArea ));
        // console.log('(cp.height / 2) - (controllerHeight/2));',(cp.height / 2) - (controllerHeight/2));
        // ctx.arc(
        //     cp.xScale.getPixelForValue( mainChartArea ),
        //     (cp.height / 2) - (controllerHeight/2),
        //     controllerHeight/2,
        //     0,
        //     2 * Math.PI
        // );
        ctx.rect(
            type === 'left'
            ? cp.xScale.getPixelForValue( mainChartArea ) - (controllerWidth/2)
            : cp.xScale.getPixelForValue( mainChartArea ) + (controllerWidth/2),
            (cp.height / 2) - (controllerHeight/2),
            controllerWidth,
            controllerHeight
        );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };
};