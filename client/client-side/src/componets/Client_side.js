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
       <div className="homePage">
            <table>
                <thead>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Passport ID:</th>
                    <th> Cash: </th>
                    <th>Credit:</th>

                </thead>
                {console.log(data)}
                {data.map((obj) => {
                    return (

                        <tbody>

                            <td>{obj.name}</td>
                            <td>{obj.email}</td>
                            <td>{obj.passportId} </td>
                            <td>{obj.cash}</td>
                            <td> {obj.credit}</td>

                        </tbody>

                    );
                })}   </table>
        </div>

    );

}

export default Client_side;