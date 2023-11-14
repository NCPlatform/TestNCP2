import React from 'react';

const FilterTest = () => {

    const array = [
        {
            id:1,
            necessary: true,
            ischecked: true
        },
        {
            id:2,
            necessary: true,
            ischecked: true
        },
        {
            id:3,
            necessary: false,
            ischecked: true
        },
        {
            id:4,
            necessary: false,
            ischecked: true
        },
        {
            id:5,
            necessary: false,
            ischecked: true
        }
    ]

    return (
        <>
            {
                array.filter((item)=>item.necessary === true&&item.ischecked === false).length > 0 ? <h1>잘못됨</h1> : <h1>잘됨</h1>
            }
        </>
    );
};

export default FilterTest;