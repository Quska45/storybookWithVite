export class Matrix3 {
    elements: number[];

    constructor(){
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    };

    setAll( m11, m12, m13, m21, m22, m23, m31, m32, m33 ){
        this.elements = [
            
            m11, m12, m13,
            m21, m22, m23,
            m31, m32, m33
            
        ];
        return this;
    };
}