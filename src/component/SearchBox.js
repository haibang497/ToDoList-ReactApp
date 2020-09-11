import React from 'react';
import '../css/SearchBox.css';

function SearchBox(props){
    return(
        <div className="search">
            <input onChange={props.handleSearch} type="text" placeholder="Search here"/>
        </div>
    )
}

export default SearchBox;