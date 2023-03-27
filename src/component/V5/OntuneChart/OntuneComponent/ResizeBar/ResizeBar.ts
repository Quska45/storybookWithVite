export interface IResizeBar {
    dom: HTMLElement;
    firstSide: HTMLElement;
    secondSide: HTMLElement;
    mouseX: number;
    mouseY: number;
    firstBBox: DOMRect;
    secondBBox: DOMRect;

    mouseDownHandler( event: MouseEvent ): void;
    mouseMoveHandler( event: MouseEvent ): void;
    mouseUpHandler( event: MouseEvent ): void;
    setFirstAndSecondSide( firstSide: HTMLElement, secondSide: HTMLElement ): void
};

export class ResizeBar implements IResizeBar {
    dom: HTMLElement;
    firstSide: HTMLElement;
    secondSide: HTMLElement;
    mouseX: number;
    mouseY: number;
    firstBBox: DOMRect;
    secondBBox: DOMRect;
    _mouseMoveHandler;
    _mouseUpHandler;

    constructor( dom: HTMLElement ){
        this.dom = dom;
    };

    setFirstAndSecondSide( firstSide: HTMLElement, secondSide: HTMLElement ){
        this.firstSide = firstSide;
        this.secondSide = secondSide;
    };

    mouseDownHandler( event: MouseEvent ){
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.firstBBox = this.firstSide.getBoundingClientRect();
        this.secondBBox = this.secondSide.getBoundingClientRect();

        this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this._mouseUpHandler = this.mouseUpHandler.bind(this);
        
        document.addEventListener('mousemove', this._mouseMoveHandler );
        document.addEventListener('mouseup', this._mouseUpHandler );
    };
    
    mouseMoveHandler( event: MouseEvent ){};

    mouseUpHandler( event: MouseEvent ){
        this.dom.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        this.firstSide.style.removeProperty('user-select');
        this.firstSide.style.removeProperty('pointer-events');

        this.secondSide.style.removeProperty('user-select');
        this.secondSide.style.removeProperty('pointer-events');

        document.removeEventListener( 'mousemove', this._mouseMoveHandler );
        document.removeEventListener( 'mouseup', this._mouseUpHandler );
    };
};