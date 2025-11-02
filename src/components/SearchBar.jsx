import React from 'react'
import { Input } from './ui/input'

const SearchBar = () => {
    return (
        <div>
            <Input placeholder="search hear ....." className={"h-9 rounded-full bg-gray-50 w-[400px]"} />
        </div>
    )
}

export default SearchBar