import React from 'react'

function Imogi({ isCheck }) {
    return(
        <>
            <div>
                당신 이모지 체크 버튼 얻고 싶습니까? isCheck 를 true로 바꾸세요ㅎㅎ
                {
                    isCheck === true && <b>여깄습니다! ✅</b>
                }
            </div>
        </>
    )
}

export default Imogi;