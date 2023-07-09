import {query_db} from "$lib/server/database";
export const POST = async (event) => {
	console.log('POST ROUTE')

	const {note_id, note_content, note_x, note_y, pinned} = await event.request.json();

	console.log(note_id, note_content, note_x, note_y, pinned);

	await query_db(`UPDATE note SET note_content = $note_content$${note_content}$note_content$, note_x = ${note_x}, note_y = ${note_y}, note_pinned = ${pinned} WHERE note_id = ${note_id}`);


	return new Response(JSON.stringify({good: true}));
}