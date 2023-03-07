import { Group } from "./Group";

export class PanGroup extends Group {
    constructor( id: string ){
        super( id );
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