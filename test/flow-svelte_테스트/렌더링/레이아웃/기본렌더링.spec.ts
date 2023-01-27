import { render, screen, fireEvent } from '@testing-library/svelte';
import FlowBiteSvelteLayout from '../../../../src/stories/FlowBiteSvelteLayout.svelte';

/**
 * Given : 
 * When  : 
 * Then  :  
*/
test('', () => {

});

/**
 * Given : 
 * When  : *.svlete로 만들어진 컴포넌트가 render 되어 인스턴스가 생성됨
 * Then  : 컴포넌트가 container 안에 존재하여 찾을 수 있음
*/
test('props 없이 컴포넌트가 정상적으로 렌더링 되는지 테스트', () => {
    // When  : *.svlete로 만들어진 컴포넌트가 render 되어 인스턴스가 생성됨
    let flowBiteSvelteLayoutComponent = render( FlowBiteSvelteLayout );
    let flowBiteSvelteLayout = flowBiteSvelteLayoutComponent.container.querySelector( '.flow_bite_svelte_layout' );

    // Then  : 컴포넌트가 container 안에 존재하여 찾을 수 있음
    expect( flowBiteSvelteLayout ).toBeInTheDocument();
});

/**
 * Given : props에 사용될 객체 생성
 * When  : *.svlete로 만들어진 컴포넌트가 props를 포함하여 render 되고, 인스턴스가 생성됨
 * Then  : 컴포넌트가 container 안에 존재하여 찾을 수 있음
*/
test('props 포함하여 컴포넌트가 정상적으로 렌더링 되는지 테스트', () => {
    // Given : prpos에 사용될 객체 생성
    let props = {
        props: {
            thema: 'blue'
        }
    }

    // When  : *.svlete로 만들어진 컴포넌트가 render 되어 인스턴스가 생성됨
    let flowBiteSvelteLayoutComponent = render( FlowBiteSvelteLayout, props );
    let flowBiteSvelteLayout = flowBiteSvelteLayoutComponent.container.querySelector( '.flow_bite_svelte_layout' );

    // Then  : 컴포넌트가 container 안에 존재하여 찾을 수 있음
    expect( flowBiteSvelteLayout ).toBeInTheDocument();
});