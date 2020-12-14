import React from 'react'

function Wrapper({ children }) {
    const divStyle = {
        border: '2px solid black',
        padding: '16px'
    }

    return(
        <>
            <dix style={divStyle}>
                {children}
            </dix>
        </>
    )
}

export default Wrapper;