import React from 'react';
import MyInput from "./input/MyInput";
import MySelect from "./select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    const options = [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'}
    ]

    return (
        <div>
            <MyInput
                value={filter.query}
                placeholder={"Search..."}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue={"Sorting"}
                options={options}
            />
        </div>
    );
};

export default PostFilter;
