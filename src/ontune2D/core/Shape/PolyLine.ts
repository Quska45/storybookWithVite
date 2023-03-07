import { Vector2 } from "../Math/Vector2";
import { Shape } from "./Shape";

export class PolyLine extends Shape {
    path: Vector2[];
    selectRange = {
            x: [],
            y: []
    };
    strokeStyle = "#000000";

    constructor( id: string ){
        super( id );

        this.path = [];
		this.selectRange = {
				x: [],
				y: []
		};
		this.strokeStyle = "#000000";
    };

    drawn(ctx: CanvasRenderingContext2D, zoom: number, qudrantSystemX: number, qudrantSystemY: number): void {
        /**
		 * 렌더링할 때, selectRange를 바꾸는 로직에서 
		 * path 값을 설정할 때, selectRange를 바꾸는 로직으로 변경이 필요
		 */
		
		this.applyPaint( ctx, zoom );
		
		ctx.beginPath();
		
		const vector0 = this.path[ 0 ];
		if( vector0 == null ){
			return;
		}
		
		this.selectRange.x = [];
		this.selectRange.y = [];
		
		ctx.moveTo( qudrantSystemX * ( vector0.x ), qudrantSystemY * ( vector0.y ) );
        let index = 0;
		for( let i=0; i<this.path.length-1; ++i ){
			const beforePath = this.path[ i ];
			const afterPath = this.path[ i+1 ];
			
			let beforeInnerVector2 = new Vector2( -2 / zoom * this.lineWidth, 0 );
			const beforeVector2 = new Vector2( qudrantSystemX * ( beforePath.x ), qudrantSystemY * ( beforePath.y ) );
			const afterVector2 = new Vector2( qudrantSystemX * ( afterPath.x ), qudrantSystemY * ( afterPath.y ) );
			
			ctx.lineTo( beforeVector2.x, beforeVector2.y );
			
			//vsrt
			beforeInnerVector2 = setApply( 
					beforeInnerVector2,
					beforeVector2,
					afterVector2
				);
			this.selectRange.x.push( beforeInnerVector2.x );
			this.selectRange.y.push( beforeInnerVector2.y );
			
			let afterInnerVector2 = new Vector2( 2 / zoom * this.lineWidth, 0 );
			
			//vsrt
			afterInnerVector2 = setApply( 
					afterInnerVector2,
					afterVector2,
					beforeVector2
				);
			this.selectRange.x.push( afterInnerVector2.x );
			this.selectRange.y.push( afterInnerVector2.y );
			
            index++;
		}
        ctx.lineTo( qudrantSystemX * ( this.path[ index ].x ), qudrantSystemY * ( this.path[ index ].y ) );
		
		for( let i=this.path.length-1; i>0; --i ){
			const beforePath = this.path[ i ];
			const afterPath = this.path[ i-1 ];
			
			let beforeInnerVector2 = new Vector2( -2 / zoom * this.lineWidth, 0 );
			const beforeVector2 = new Vector2( qudrantSystemX * ( beforePath.x ), qudrantSystemY * ( beforePath.y ) );
			const afterVector2 = new Vector2( qudrantSystemX * ( afterPath.x ), qudrantSystemY * ( afterPath.y ) );
			
			//vsrt
			beforeInnerVector2 = setApply( 
					beforeInnerVector2,
					beforeVector2,
					afterVector2
				);
			this.selectRange.x.push( beforeInnerVector2.x );
			this.selectRange.y.push( beforeInnerVector2.y );
			
			let afterInnerVector2 = new Vector2( 2 / zoom * this.lineWidth, 0 );
			
			//vsrt
			afterInnerVector2 = setApply( 
					afterInnerVector2,
					afterVector2,
					beforeVector2
				);
			this.selectRange.x.push( afterInnerVector2.x );
			this.selectRange.y.push( afterInnerVector2.y );
			
		}
		
		this.selectRange.x.push( this.selectRange.x[0] );
		this.selectRange.y.push( this.selectRange.y[0] );
		
		
//			if( this.isFixedSize === true ){
//				ctx.moveTo( -0.5 / zoom, 0 );
//				ctx.lineTo( 0.5 / zoom, 0 );
//			}else{
//				ctx.moveTo( -0.5, 0 );
//				ctx.lineTo( 0.5, 0 );
//			}
//		ctx.closePath();
		ctx.stroke();
    };
};

function setApply( innerVector2, beforeVector2, afterVector2 ) {
    const radian = Math.atan2( afterVector2.y - beforeVector2.y, afterVector2.x - beforeVector2.x ) + Math.PI / 2;
    const rM = new Vector2( radian, radian ).getRotateMatrix3();
    const tM = beforeVector2.getTranslateMatrix3();
    
    innerVector2.multiplyMatrix3( rM );
    innerVector2.multiplyMatrix3( tM );
    
    return innerVector2;
};