import React from 'react'

const Image = (props) => {
  return (
    <img 
      src={props.source}
      onClick={props.onClick}
      data-keywords={props.keywords}
      alt=""
    >
    </img>
  )
}

export default Image