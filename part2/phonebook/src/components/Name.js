import React from 'react'

const Name = ({handleDelete, name, number, id}) => {
    return (
        <div>
            <p>{name} {number}</p>
            <button onClick={() => handleDelete(name, id)}>Delete</button>
        </div>
    )
}

export default Name
