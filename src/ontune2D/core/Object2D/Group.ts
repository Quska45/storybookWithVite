import { Vector2 } from "../Math/Vector2";
import { Object2D } from "./Object2D";

export class Group extends Object2D {
    // parent: Object2D;
    children: Object2D[];
    pivot: Vector2;
    isGroup = true;

    constructor( id: string ){
        super( id );
        // this.parent = null;
        this.children = [];
        this.scale.set( 1, 1 );
        this.position.set( 0, 0 );
        this.pivot = new Vector2( 0, 0 );
        // Group의 기본 선택 영역은 네모
        this.selectRange = {
            x: [ -0.5, -0.5, 0.5, 0.5, -0.5 ],
		    y: [ -0.5, 0.5, 0.5, -0.5, -0.5 ]
        };
    };

    add( object2d: Object2D ){
        const group = this;
        const isGroup = object2d instanceof Group;

        let depth = 0;
        if( isGroup ){
            // 기존의 참조 제거
            object2d.parent instanceof Group ? object2d.parent.remove( object2d.parent ) : null;
            object2d.parent = group;
        } else {
            object2d.parent = null;
            object2d.parent = group;
        };
        
        /**
         * ? : group에 추가되는 객체에 대해서 zIndex와 depth에 대한 고민이 필요할 수 있음
         * 현재 방향 : 추가되는 객체는 group과 동일한 zIndex를 가지게 됨. 대신 depth는 추가되는 순서대로 커지는 값을 가짐.
         */
        group.children.forEach( () => depth++ );
        object2d.depth = depth;
        object2d.zIndex = group.zIndex;
        group.children.push( object2d );
    };

    remove( object2d: Object2D ){
        const group = this;
        for( let i=0; i<group.children.length; ++i ){
            let child = group.children[ i ];
            if( child === object2d ){
                group.children.splice( i, 1 );
                object2d instanceof Group ? object2d.parent = null : null;

                return true;
            };
        };

        return false;
    };

    traverse(callback: Function, endCallback?: Function): boolean {
        const group = this;
        // 탐색 수동 종료: return false;
        if( callback( group ) === false ){
            return false;
        };
        for( var i=0; i<group.children.length; ++i ){
            const childIsGroup = group.children[i] instanceof Group ? true : false;
            if( childIsGroup === true ){
                group.children[i].traverse( callback, endCallback );
            }else{
                if( callback( group.children[i] ) === false ){
                    return false;
                };
                if( typeof endCallback !== "function" ){
                    continue;
                }
                
                if( endCallback( group ) === false ){
                    return false;
                };
            }
        }
        
        if( typeof endCallback !== "function" ){
            return;
        }
        
        if( endCallback( group ) === false ){
            return false;
        };
    }
};