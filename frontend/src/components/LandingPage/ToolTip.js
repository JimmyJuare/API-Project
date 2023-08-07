import React, { useState } from 'react';

function ToolTip({ text }) {
  const [toolTip, setToolTip] = useState(false);

  const handleMouseOver = () => {
    setToolTip(true);
  };

  const handleMouseOut = () => {
    setToolTip(false);
  };

  return (
    <div
      className='tooltip-container'
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {toolTip && <div className='tooltip'>{text}</div>}
    </div>
  );
}

export default ToolTip;
