import React from 'react';
import Select from './Select/Select';
import Details from './Detials/Details';


const Home = () => {
    return (
        <div className="container">
            <h1 className='mt-5'>Flight Status</h1>
            <Select />
            <Details />
        </div>
    );
}

export default Home;
