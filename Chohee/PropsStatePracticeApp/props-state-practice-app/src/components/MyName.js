import React, { Fragment } from 'react';

function MyName(props) {
    return(
        <Fragment>
            <div>하이하이 난 <b>{props.name}</b> 이라네!! 반갑네 자네^^</div>
        </Fragment>
    )
}

// 이 MyName이라는 컴포넌트를 외부에서도 가져다 사용할 수 있게 하기 위함
export default MyName;