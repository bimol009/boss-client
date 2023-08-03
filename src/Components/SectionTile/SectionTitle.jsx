import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="text-center mt-10 mb-10 w-4/12 mx-auto my-8 text-2xl">
            <p className="text-yellow-600 mb-2">{subHeading}</p>
            <h3 className="uppercase text-4xl border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;