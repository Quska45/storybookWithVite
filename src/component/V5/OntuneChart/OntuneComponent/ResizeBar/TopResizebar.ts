import { ResizeBar } from "./ResizeBar";

export class TopResizeBar extends ResizeBar {
    constructor( dom: HTMLElement ){
        super( dom );
    };

    setFirstAndSecondSide( firstSide: HTMLElement, secondSide: HTMLElement ){
        this.firstSide = secondSide;
        this.secondSide = firstSide;
    };

    mouseMoveHandler( event: MouseEvent ) {
        const dx = event.clientX - this.mouseX;
        const dy = event.clientY - this.mouseY;

        document.body.style.cursor = 'row-resize';
        
        // 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
        this.firstSide.style.userSelect = 'none';
        this.firstSide.style.pointerEvents = 'none';
        
        this.secondSide.style.userSelect = 'none';
        this.secondSide.style.pointerEvents = 'none';
        
        const newFirstHeight = ((this.firstBBox.height + dy) * 100) / (this.dom.parentNode as HTMLElement).getBoundingClientRect().height;
        const newSecondHeight = 100 - newFirstHeight;
        
        if( newFirstHeight < 15 ){
            return;
        };

        if( newSecondHeight < 20 ){
            return;
        };
        
        this.firstSide.style.height = `${newFirstHeight}%`;
        this.secondSide.style.height = `${newSecondHeight}%`;
    };
};