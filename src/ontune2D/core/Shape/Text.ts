import { Shape } from "./Shape";
import { Util } from "../Util/Util";

export class Text extends Shape {
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    needsUpdate: boolean;
    borderWidth: number;
    text: string;
    fontFamily: string;

    constructor( id: string, text: string ){
        super( id );
        // Object.defineProperties(this,{
        //     "text": {
        //         get: function get(){
        //             return this.text;
        //         },
        //         set: function set( value ) {
        //             this.text = value;
        //             this.updateSelectRange();
        //         }
        //     },
        //     "fontFamily": {
        //         get: function get(){
        //             return this.fontFamily;
        //         },
        //         set: function set( value ) {
        //             this.fontFamily = value;
        //             this.updateSelectRange();
        //         }
        //     }
        // });

        this.text = text;

        this.updateSelectRange();
    };

    // 텍스트는 데이터를 변경할 경우, 선택 범위가 바뀌므로 생긴 메서드
    updateSelectRange(){
        const text = this;

        const textSize = Util.getTextSize( text );
        const halfX = textSize.width / 20;
        const halfY = 1/2;
        
        this.selectRange = {
                x: [ -halfX, -halfX, halfX, halfX, -halfX ],
                y: [ -halfY, halfY, halfY, -halfY, -halfY ]
        };
    };

    drawn(ctx: CanvasRenderingContext2D, zoom: number, qudrantSystemX: number, qudrantSystemY: number): void {
        const text = this;

        text.applyPaint( ctx, zoom );
        // 폰트사이즈를 10px로 고정하고, 스케일링으로만 폰트사이즈를 조절 ( fontSize, scale 개념이 공존하면 혼란스러운 이유 ) 
        ctx.scale( 0.1, 0.1 );
        ctx.beginPath();
        ctx.textAlign = text.textAlign;
        ctx.textBaseline = text.textBaseline;
        ctx.closePath();
        
        var fontSize = 10;
        ctx.font = fontSize + "px " + text.fontFamily;
        
        if( text.borderWidth > 0 ){
            ctx.lineWidth = text.borderWidth; 
            ctx.strokeText( text.text, 0, 0 );
        }
        if( text.fillStyle != null ){
            ctx.fillText( text.text, 0,0 );
        }
    };
};
