import React from 'react'

const Filter = ({filter, handleFilter}) => {
    return (
    <div>
        filter show by name: <input value={filter} onChange={handleFilter}/>
    </div>
    )
}

export default Filter
