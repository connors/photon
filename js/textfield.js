{
	const contextmenu = electron.remote.Menu.buildFromTemplate([
		{ role: 'undo' },
		{ role: 'redo' },
		{ type: 'separator' },

		{ role: 'cut' },
		{ role: 'copy' },
		{ role: 'paste' },
		{ type: 'separator' },

		{ role: 'selectall' },
	]);

	$(document)
		.on('contextmenu', 'input, textarea, [contenteditable]', event => {
			event.preventDefault();
			event.stopPropagation();

			contextmenu.popup(electron.remote.getCurrentWindow(), {
				async: true
			});
		})
	;
}
