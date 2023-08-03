import React from 'react';

const MenuItem = ({item}) => {
    const {name,recipe,image,price} = item;
    return (
        <div className="flex space-x-2">

            <img style={{borderRadius:"0px 200px 200px 200px"}} className="w-[100px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500 font-bold">{price}</p>
        </div>
        
    );
};

export default MenuItem;