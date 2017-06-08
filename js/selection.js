{
	let toggling = false;
	let togglingState = false;

	$(document)
		.on('mousedown', 'table[data-select-multiple] > tbody > tr, .nav-group[data-select-multiple] > .nav-group-item, .list-group[data-select-multiple] > .list-group-item', function(event){
			const $this = $(this);

			if((event.ctrlKey||event.metaKey)){
				toggling = true;
				togglingState = !$this.hasClass('active');
				$this.addClass('selected').toggleClass('active').siblings().removeClass('selected');
				$(document).one('mouseup', () => {
					toggling = false;
				});

			}else if(event.shiftKey){
				const from = Math.max($this.siblings('.selected').index(),0);
				const to = $this.index();

				$this.siblings().removeClass('active');
				const $children = $this.parent().children();
				for(let i=Math.min(from,to); i<=Math.max(from,to); i++){
					$children.eq(i).addClass('active');
				}

			}else{
				if(!$this.hasClass('active')||event.which==1){
					$this.addClass('active selected').siblings().removeClass('active selected');
				}
			}

			$this.closest('[data-select-multiple]').trigger('change');
		})
		.on('mouseenter', 'table[data-select-multiple] > tbody > tr, .nav-group[data-select-multiple] > .nav-group-item, .list-group[data-select-multiple] > .list-group-item', function(event){
			const $this = $(this);

			if(toggling){
				$this.toggleClass('active', togglingState);

			}else if(event.buttons&1&&!event.shiftKey){
				$this.addClass('active').siblings().removeClass('active');

			}else{
				return;
			}

			$this.closest('[data-select-multiple]').trigger('change');
		})
		.on('mousedown', 'table:not([data-select-multiple]) > tbody > tr', function(event){
			const $this = $(this);
			$this.addClass('active').siblings().removeClass('active');
			$this.parent().parent().trigger('change');
		})
		.on('mousedown', '.nav-group:not([data-select-multiple]) > .nav-group-item, .list-group:not([data-select-multiple]) > .list-group-item', function(event){
			const $this = $(this);
			$this.addClass('active').siblings().removeClass('active');
			$this.parent().trigger('change');
		})
	;
}
