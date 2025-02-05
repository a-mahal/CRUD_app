import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({ handleOpen, searchTerm }) {
    {/*This will contain a json file */}
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    {/* This gets the data from our DB */}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clients')
                setTableData(response.data);
            } catch (err) {
                setError(err.message)
            }
        };
        fetchData();
    }, []);

    {/* This is for the search function, it filters the data */}
    const filteredData = tableData.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())   
    );
    
    return (
        <>
            {error && <div className='alert alert-error'>{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job</th>
                        <th>Rate</th>
                        <th>Status</th>
                        
                    </tr>
                    </thead>
                    <tbody className="hover">
                    {/* row 1: using a function to loop through the data */}
                    {filteredData.map((client) => (
                        <tr>
                            <th>{client.id}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.job}</td>
                            <td>{client.rate}</td>
                            <td>
                                <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary`}`}>
                                {client.isactive ? `Active` : `Inactive`}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleOpen('edit')} className="btn btn-secondary">
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-accent">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                        
                    
                    </tbody>
                </table>
            </div>
        </>
    )
}