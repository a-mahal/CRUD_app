import {query} from "../db.js"

export const getClients = async() => {
    const {rows} = await query('SELECT * FROM clients_tb')
    return rows;
}

export const createClient = async(clientData) => {
    const { name, email, job, rate, isactive } = clientData

    const { rows } = await query(
        `INSERT INTO clients_tb (name, email, job, rate, isactive) 
         VALUES ($1, $2, $3, $3, $5) RETURNING *`,
        [name, email, job, rate, isactive]
        );

    {/* returns what you inserted */}
    return rows[0];
}