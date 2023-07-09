<script>
	import '../styles/global.scss';
</script>

<nav>
	<div class="margin-container">
		<div class="navigation-content">
			<h2 class="heading">Stickied <span class="empf">Notes</span></h2>
			<div class="links">
				<a href="/">home</a>
				<a href="/about">about</a>
			</div>
		</div>
	</div>
</nav>

<slot></slot>

<footer>
	<p>&copy; The Stickied Note Co.</p>
</footer>

<style lang="scss">
	@use '../styles/colors';
	nav {
		padding: 15px 0;
		background-color: colors.$dark-color;
		color: white;

		.navigation-content {

			display: flex;
			justify-content: space-between;
			align-items: center;

			.heading {
				font-family: 'Gloria Hallelujah', serif;
				font-size: 3rem;
				letter-spacing: 2px;
			}

			.links {
				display: flex;
				gap: 20px;
				font-size: 2rem;

				a {
					color: white;
					text-decoration: none;

					border-bottom: 2px solid transparent;
					transition: border-bottom-color 200ms ease-in-out;

					&:hover {
						border-bottom-color: white;
					}
				}
			}
		}
	}

	footer {
		position: absolute;
		bottom: 0;
		color: white;
		padding: 2px;
	}
</style>