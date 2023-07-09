import pg from 'pg';
import { PRIVATE_DATABASE_URL } from '$env/static/private';

const {Pool} = pg;
const pool = new Pool({ connectionString: PRIVATE_DATABASE_URL });

export const query_db = async (query) => {
	const client = await pool.connect();

	try {
		return await client.query(query);
	} catch (err) {
		console.log(err.message);
	} finally {
		client.release();
	}
}
