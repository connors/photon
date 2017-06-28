{
	$(document)
		.on('mousedown', '.pane-group > .dragbar', function(event){
			const $this = $(this);
			const $group = $this.parent();
			const isVertical = $group.hasClass('vertical');

			const start = isVertical?event.clientY:event.clientX;

			const $prev = $this.prev('.pane');
			const $next = $this.next('.pane');

			const sizes = isVertical?[$prev.height(), $next.height()]:[$prev.width(), $next.width()];

			$prev.css({ flex: '1 '+sizes[0]+'px'});
			$next.css({ flex: '1 '+sizes[1]+'px'});

			$this.addClass('active');

			function onMouseMove(event) {
				const diff = (isVertical?event.clientY:event.clientX) - start;

				console.log(diff);

				$prev.css({ flex: '1 '+(sizes[0]+diff)+'px'});
				$next.css({ flex: '1 '+(sizes[1]-diff)+'px'});
			}

			function onMouseUp(event) {
				$this.removeClass('active');

				$(window)
					.off('mousemove', onMouseMove)
					.off('mouseup', onMouseUp)
				;
			}

			$(window)
				.on('mousemove', onMouseMove)
				.on('mouseup', onMouseUp)
			;
		})
	;
}
