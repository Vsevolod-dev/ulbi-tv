import React, {useState} from 'react';

const Input = () => {
    const [value, setValue] = useState('');

    const inputHandler = (e) => {
        setValue(e.target.value )
    }

    return (
        <div>
            <input type="text" value={value} onChange={inputHandler}/>
            <span>{value}</span>
        </div>
    );
};

export default Input;
