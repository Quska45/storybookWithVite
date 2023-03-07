import { Matrix3 } from "./Matrix3";

export class Vector2{
    x: number;
    y: number;

    constructor( x: number, y: number ){
        this.x = x;
        this.y = y;
    };

    set(  x: number, y: number  ){
        const vector2 = this;

        vector2.x = x;
        vector2.y = y;
    };

    // 

    // v -> m(R)
    getRotateMatrix3(){
        const vector2 = this;
        const matrix = new Matrix3();

        const sinX = Math.sin( vector2.x );
        const cosX = Math.cos( vector2.x );
        const sinY = Math.sin( vector2.y );
        const cosY = Math.cos( vector2.y );

        return matrix.setAll(
			cosX, -sinX, 0,
			sinY, cosY,  0,
			0,	  0,	 1
	    );
    };

    // v -> m(T)
    getTranslateMatrix3(){
        const matrix = new Matrix3();
	
        const translateX = this.x;
        const translateY = this.y;
        
        return matrix.setAll(
            1,	0,	translateX,
            0,	1,	translateY,
            0,	0,	1
        );
    }

    // vector * Matrix = VectorMatrix
    multiplyMatrix3( matrix3: Matrix3 ){
        const m0 = matrix3.elements[ 0 ];
        const m1 = matrix3.elements[ 1 ];
        const m2 = matrix3.elements[ 2 ];
        const m3 = matrix3.elements[ 3 ];
        const m4 = matrix3.elements[ 4 ];
        const m5 = matrix3.elements[ 5 ];
        const m6 = matrix3.elements[ 6 ];
        const m7 = matrix3.elements[ 7 ];
        const m8 = matrix3.elements[ 8 ];
        
        const x = this.x * m0 + this.y * m1 + 1 * m2;
        const y = this.x * m3 + this.y * m4 + 1 * m5;
        
        this.x = x;
        this.y = y;
    };
};