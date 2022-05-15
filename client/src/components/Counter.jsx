import React, {useState} from 'react';

const Counter = () => {
    const [likes, setLikes] = useState(0);

    const incrementHandler = () => {
        setLikes(likes + 1)
    }
    const decrementHandler = () => {
        setLikes(likes - 1)
    }

    return (
        <div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={decrementHandler}>Decrement</button>
            <span>{likes}</span>
        </div>
    );
};

export default Counter;
