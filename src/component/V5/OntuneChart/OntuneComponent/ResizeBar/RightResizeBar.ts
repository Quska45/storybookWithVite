import { ResizeBar } from "./ResizeBar";

export class RightResizeBar extends ResizeBar {
    constructor( dom: HTMLElement ){
        super( dom );
    };

    mouseMoveHandler( event: MouseEvent ) {
        const dx = event.clientX - this.mouseX;
        const dy = event.clientY - this.mouseY;

        document.body.style.cursor = 'col-resize';
        
        // 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
        this.firstSide.style.userSelect = 'none';
        this.firstSide.style.pointerEvents = 'none';
        
        this.secondSide.style.userSelect = 'none';
        this.secondSide.style.pointerEvents = 'none';
        
        const newFirstWidth = ((this.firstBBox.width + dx) * 100) / (this.dom.parentNode as HTMLElement).getBoundingClientRect().width;
        const newRightWidth = 100 - newFirstWidth;
        
        if( newFirstWidth < 20 ){
            return;
        };

        if( newRightWidth < 15 ){
            return;
        }
        
        this.firstSide.style.width = `${newFirstWidth}%`;
        this.secondSide.style.width = `${newRightWidth}%`;
    };
};