<script>
	export let content = 'N/A';
    export let note_id = -1;

    export let x = 0;
    export let y = 0;

    let stickyNote;

    let currentX = x, currentY = y;
    export let pinned = false;

    const saveNote = async () => {
        let response = await fetch('/api/save-note', {
            method: 'post',
            body: JSON.stringify({
				note_id,
				note_content: content,
				note_x: currentX,
				note_y: currentY,
				pinned
            })
        });
        let data = await response.json();
        console.log(data);

        console.log('saved input\n', content);
	}


    let inputSaveTimeout = null;
    const inputEventHandler = (inputEvent) => {
        if(inputSaveTimeout !== null) clearTimeout(inputSaveTimeout);
        inputSaveTimeout = setTimeout(async () => {
            content = inputEvent.target.textContent.trim();
            await saveNote();
		}, 1000);
	}

    const mouseDownEventHandler = (mouseDownEvent) => {
		console.log("note " + note_id + " was clicked");

        if(pinned) return;

        let percentX = currentX, percentY = currentY;

        onmousemove = (mouseMoveEvent) => {
            percentY = ((mouseMoveEvent.clientY - mouseDownEvent.offsetY) / innerHeight) * 100;
            percentX = ((mouseMoveEvent.clientX - mouseDownEvent.offsetX) / innerWidth) * 100;

            stickyNote.style.top = percentY + '%';
            stickyNote.style.left = percentX + '%';
        };

        onmouseup = async () => {
            if(pinned) return;
            currentX = percentX;
            currentY = percentY;

            await saveNote();
            onmousemove = null;
		}
	}

    const pinClickHandler = async () => {
        pinned = !pinned;
        await saveNote();
	}

    const noteDeleteHandler = async () => {
        if(pinned) return;
        await fetch('/api/delete-note', {method: 'POST', body: JSON.stringify({id: note_id})});
        stickyNote.parentElement.removeChild(stickyNote);
	}

</script>

<div bind:this={stickyNote} class="sticky-note" draggable="false" style="top: {y}%; left: {x}%;">
	<div role="textbox" on:mousedown={mouseDownEventHandler} class="sticky-note_header">
		<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
		<div class="sticky-note_header_actions">
			<svg on:click={pinClickHandler} class={pinned ? 'pinned' : ''} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg>
			<svg on:click={noteDeleteHandler} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
		</div>
	</div>
	<div class="sticky-note_content">
		<p on:input={inputEventHandler} contenteditable spellcheck="false">{content}</p>
	</div>
</div>

<style lang="scss">
	@use '../../styles/colors';

	.sticky-note {
		position: absolute;

		background-color: colors.$sticky-note;

		overflow: hidden;

		min-height: 200px;
		width: 200px;

		font-family: 'Gloria Hallelujah', sans-serif;

		border-radius: 2px;

		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.25), -1px -1px 5px 0 rgba(0, 0, 0, 0.05);

		/* remove the ability to select text. Upsets the drag feature when possible */
		-webkit-user-select: none; /* Safari */
		user-select: none; /* Standard */

		&_header {
			background-color: rgba(0, 0, 0, 0.06);

			font-size: 1.3rem;

			padding: 5px 10px;

			display: flex;
			justify-content: space-between;
			align-items: center;

			&:hover {
				cursor: grab;
			}
			&:active {
				cursor: grabbing;
			}

			svg {
				fill: colors.$sticky-note-dark;

				transition: fill 200ms ease-in-out;
				&:hover {
					fill: colors.$primary-color;
					cursor: pointer;
				}
			}

			&_actions {
				.pinned {
					fill: colors.$primary-color;
				}
			}
		}

		&_content {
			padding: 10px;
			font-size: 1.1rem;

			p[contenteditable] {
				outline-color: colors.$primary-color;
			}
		}


	}
</style>