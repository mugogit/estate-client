import React from 'react'
import './loading.scss'

const Loading = () => {
    return (
        <div className="loading">
            <div className="loader">
                <div className="top"></div>
                <div className="wrapper">
                    {[0, 1, 2, 3].map((index) => (
                        <span key={index} style={{ "--i": index } as React.CSSProperties} className="span"></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Loading