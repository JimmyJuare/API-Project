import React, { useState } from 'react';
function ToolTip(){
    const [toolTip, setToolTip] = useState(false)
    const handleMouseOver = () => {
        setToolTip(true)
    }
    const handleMouseOut = () => {
        setToolTip(false)
    }
    return (
        <div className='tooltip-container'>
            {toolTip && <div>{text}</div>}
        </div>
    )
}
