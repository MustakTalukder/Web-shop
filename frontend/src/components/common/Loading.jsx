import React from 'react'

const Loading = props => {
  return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border " role="status">
            <span className="visually-hidden"></span>
        </div>
    </div>
  )
}

export default Loading