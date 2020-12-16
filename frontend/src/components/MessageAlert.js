import React from 'react'

export default function MessageAlert({children, variant}) {
    console.log(children);
    return (
        <div className={`alert alert-${variant} || 'info'`}>
            {children}
        </div>
    )
}
