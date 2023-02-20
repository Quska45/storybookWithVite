import type { Ontune2D } from "./constructor";

/**
	콜백 등록
**/
export function on( ontune2d: Ontune2D, type: string, callback: Function ){
	const callbacks = ontune2d.event[ type ];
	if( callbacks == null ){
		return false;
	}
	
	if( typeof callback !== "function" ){
		return false;
	}
	
	const sequence = ontune2d.event.sequence;
	callbacks[ sequence ] = callback;
	ontune2d.event.sequence++;
	
	return sequence;
};

/**
	콜백 제거
**/
export function off( ontune2d: Ontune2D, reqSequence: number ){
	for( const type in ontune2d.event ){
		const callbacks = ontune2d.event[ type ];
		for( let sequence in callbacks ){
			if( Number(sequence) == reqSequence ){
				delete callbacks[ sequence ];
				return true;
			}
		}
	}
	
	return false;
};