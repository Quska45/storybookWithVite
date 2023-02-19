export class Renderer {
    id: string;
    selector: string;
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor( id: string, selector: string ){
        let renderer = this;

        // 기본 필드 세팅
        renderer.id = id;
        renderer.selector = selector;
        renderer.container = document.querySelector( selector );
        renderer.canvas = document.createElement( 'canvas' );
        renderer.ctx = renderer.canvas.getContext( '2d' );

        // canvas를 현재 돔트리 안으로 붙여줌
        renderer.container.appendChild( renderer.canvas );

        // canvas를 container의 크기에 맞게 resize
        renderer.resize();
    };

    // rendere.canvas를 resize 해주는 기능
    resize(){
        let renderer = this;

        // 현재 컨테이너 크기 조회
        var rect = this.container.getBoundingClientRect();
        var pl = parseFloat( renderer.container.style.paddingLeft );
        var pr = parseFloat( renderer.container.style.paddingRight );
        var pb = parseFloat( renderer.container.style.paddingBottom );
        var pt = parseFloat( renderer.container.style.paddingTop );
        
        if( isNaN( pl ) === false ){
            rect.width -= pl;
        }
        if( isNaN( pr ) === false ){
            rect.width -= pr;
        }
        if( isNaN( pb ) === false ){
            rect.height -= pb;
        }
        if( isNaN( pt ) === false ){
            rect.height -= pt;
        }
        renderer.canvas.width = rect.width;
        renderer.canvas.height = rect.height;
    }
};