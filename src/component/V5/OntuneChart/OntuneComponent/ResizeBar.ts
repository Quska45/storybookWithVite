import { OntuneChartComponent } from "./OntuneChartComponent";

export class ResizeBar extends OntuneChartComponent {
    leftSide: HTMLElement;
    rightSide: HTMLElement;
    mouseX = 0;
    mouseY = 0;
    leftWidth = 0;
    private _mouseMoveHandler;
    private _mouseUpHandler;


    constructor( dom: HTMLElement ){
        super( dom );

        this.leftSide = dom.previousElementSibling as HTMLElement;
        this.rightSide = dom.nextElementSibling as HTMLElement;
    };

    mouseDownHandler( event: MouseEvent ) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.leftWidth = this.leftSide.getBoundingClientRect().width;

        this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this._mouseUpHandler = this.mouseUpHandler.bind(this);
        
        document.addEventListener('mousemove', this._mouseMoveHandler );
        document.addEventListener('mouseup', this._mouseUpHandler );
        console.log(this.mouseUpHandler === this.mouseUpHandler.bind(this));
    };

    mouseMoveHandler( event: MouseEvent ) {
        const dx = event.clientX - this.mouseX;
        const dy = event.clientY - this.mouseY;

        document.body.style.cursor = 'col-resize';
        
        // 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
        this.leftSide.style.userSelect = 'none';
        this.leftSide.style.pointerEvents = 'none';
        
        this.rightSide.style.userSelect = 'none';
        this.rightSide.style.pointerEvents = 'none';
        
        const newLeftWidth = ((this.leftWidth + dx) * 100) / (this.dom.parentNode as HTMLElement).getBoundingClientRect().width;
        const newRightWidth = 100 - newLeftWidth;
        this.leftSide.style.width = `${newLeftWidth}%`;
        this.rightSide.style.width = `${newRightWidth}%`;
    };

    mouseUpHandler( event: MouseEvent ){
        this.dom.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        this.leftSide.style.removeProperty('user-select');
        this.leftSide.style.removeProperty('pointer-events');

        this.rightSide.style.removeProperty('user-select');
        this.rightSide.style.removeProperty('pointer-events');

        document.removeEventListener( 'mousemove', this._mouseMoveHandler );
        document.removeEventListener( 'mouseup', this._mouseUpHandler );
    };
};