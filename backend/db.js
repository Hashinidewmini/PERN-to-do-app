import {pool} from 'pg';

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "tododb"
});

export default pool; //to use in routes need to export the pool object so that it can be imported 
                     // in other files where database operations are performed.