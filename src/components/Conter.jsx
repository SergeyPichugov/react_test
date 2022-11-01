import React, { useState } from 'react';



const Counter = function () {
    const [count, setCount] = useState(0);

    function increment (){
        setCount(count + 1)
    }

    function decrement (){
        setCount(count - 1)
    }

    return (
        <div>
            <h1>
                {count}
            </h1>

            <button onClick={increment} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">добавить</button>
            <button onClick={decrement}>убрать</button>
        </div>
     );
}

export default Counter;
