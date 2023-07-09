import {query_db} from "../lib/server/database";
import type { PageServerLoad } from "./$types";
import {fail} from "@sveltejs/kit";

export const load = async () => {
	//console.log(await query_db('SELECT version()'));

	let notes = (await query_db('SELECT * FROM note ORDER BY note_id')).rows;
	return {notes};
}

export const actions = {
	add_note: async (event) => {
		let data = await event.request.formData();

		let inserted = await query_db(`INSERT INTO note (note_content, note_x, note_y) VALUES ($note_content$${data.get('note_content')}$note_content$, ${data.get('note_x')}, ${data.get('note_y')}) RETURNING *`);

		return {added_note: inserted.rows[0]};
	},
	save_note: async (event) => {

	}
}