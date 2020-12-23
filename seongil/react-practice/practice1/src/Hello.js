import React from 'react';

function Hello (props) {
    return (
        <div>
            {props.isSpecial ? <b>앙 </b> : null}
            <div style={{color:props.color}}> 안녕하세요 
            저는 <b>{props.name}</b> 입니다. </div>
        </div>
    );
}

Hello.defaultProps = {
        name : '이름없음',
        color : 'red'
}

export default Hello;