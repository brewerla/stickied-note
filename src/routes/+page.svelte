<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import {enhance} from "$app/forms";
	import {onMount} from "svelte";

	export let data;

	onMount(() => {
		for(let note of data.notes) {
			new Note({
				target: document.getElementById('notes'),
				props: {
					note_id: note.note_id,
					content: note.note_content,
					x: note.note_x,
					y: note.note_y,
					pinned: note.note_pinned
				}
			});
		}
	})

    const NoteSubmissionHandler = ({formData}) => {
		formData.set('note_x', 0);
		formData.set('note_y', 0);
		return async ({result, update}) => {
			if(result.type === 'success') {

				console.log(result);
				new Note({
					target: document.getElementById('notes'),
					props: {
						note_id: result.data.added_note.note_id,
						content: formData.get('note_content')
					}
				});
			}
			await update({reset: true});
		}
	}
</script>

<div class="note-creator">
	<h1 class="title">Note Creator</h1>
	<p>Use our handy-dandy note creator to create some Stickied Notes&trade;</p>

	<form use:enhance={NoteSubmissionHandler} method="POST" action="?/add_note">
		<input type="text" id="note-content-field" name="note_content" placeholder="Stickied Note&trade; content" autocomplete="off">
		<button type="submit">Create</button>
	</form>
</div>

<div id="notes"></div>

<style lang="scss">
	@use '../styles/colors';
	.note-creator {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50%;

		background-color: colors.$very-dark;

		color: white;

		width: 50%;
		padding: 30px;

		border-radius: 5px;

		.title {
			font-family: 'Gloria Hallelujah', sans-serif;
			font-size: 2.5rem;
		}
		p {
			font-size: 1.3rem;
			margin-bottom: 20px;
		}

		form {

			display: flex;
			gap: 10px;

			input {
				flex: 3 1 0;

				width: 100%;
				padding: 10px;
				border: none;
				outline: none;

				border-radius: 5px;
			}

			button {
				flex: 1 1 0;
				background-color: colors.$primary-color;
				outline: none;
				border: none;
				border-radius: 5px;
				color: white;

				transition: background-color 200ms ease-in-out;

				&:hover {
					background-color: white;
					color: colors.$primary-color;
				}
			}
		}
	}
</style>