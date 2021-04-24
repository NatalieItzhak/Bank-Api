import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Client_side = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5005/users/').then((res) => {
            console.log(res);
            setData(res.data)
            console.log(res)
        })
    }, [])

    return (
        <div >
            {console.log(data)}
            {data.map((obj) => {
                return (
                    <div className='users'>

                        <ul>
                            <li> Name: {obj.name}</li>
                            <li>   Email: {obj.email}</li>
                            <li>  Passport ID: {obj.passportId} </li>
                            <li>  Cash: {obj.cash} </li>
                            <li>  Credit: {obj.credit} </li>
                            {/* <li>  Is Active: {obj.isActive} </li> */}
                        </ul>


                    </div>
                );
            })}
        </div>
    );

}

export default Client_side;