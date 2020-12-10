import React from 'react'

// 1. 부모 컴포넌트에서 전달받을 props들 인자로 넣어주기
function Hello({ color, name, isSpecial }) {
    return(
        <>
            <div style={{ color }}>
                {/* 2. 삼항연산자로 조건부 렌더링 해주기
                  * 어떤 조건에서 렌더링할 뷰가 없으면 삼항 연산자에 null 넣어주기 */}
                {
                    isSpecial === true ? <b>넌 스페셜~~</b> : null
                }
                안녕하세요 {name}님!
            </div> 
        </>
    )
}

Hello.defaultProps = {
    name: '닉네임 없음'
}

export default Hello;