import type { Text } from "../Shape/Text";

export const Util = {
    getTextSize: function( textObject2d: Text ){
        // 텍스트를 재기위한 캔버스
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        
        ctx.font = "10px " + textObject2d.fontFamily;
        return ctx.measureText( textObject2d.text );
    }
};