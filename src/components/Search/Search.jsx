import React, { useEffect, useState } from 'react'

const searchInputStyle = {
    width: '50%',
    height: '25px', 
    border: '1px solid #c5c5c5', 
    borderRadius: '10px', 
    padding: '4px', 
    fontSize: '1em'
}

const Search = ({ listHandler }) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            listHandler(inputValue)
        }, 800)

        return () => clearTimeout(timer)
    }, [inputValue])

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    return (
        <input
            style={searchInputStyle}
            value={inputValue} onChange={(e) => { handleInputChange(e) }}
            placeholder='Type to search..'
        />
    )
}

export default Search