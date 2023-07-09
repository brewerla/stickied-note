import {query_db} from "$lib/server/database";
export const POST = async (event) => {

	const {id} = await event.request.json();
	console.log(id + " ++++++++++++++++")

	await query_db(`DELETE FROM note WHERE note_id = ${id}`);

	return new Response(JSON.stringify({good: true}));
}