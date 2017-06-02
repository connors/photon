{
	let toggling = false;
	let togglingState = false;

	$(document)
		.on('mousedown', 'table[data-select-multiple] > tbody > tr, .nav-group[data-select-multiple] > .nav-group-item', function(event){
			if((event.ctrlKey||event.metaKey)){
				toggling = true;
				togglingState = !$(this).hasClass('active');
				$(this).toggleClass('active');
				$(document).one('mouseup', () => {
					toggling = false;
				});
			}else{
				$(this).addClass('active').siblings().removeClass('active');
			}
		})
		.on('mouseenter', 'table[data-select-multiple] > tbody > tr, .nav-group[data-select-multiple] > .nav-group-item', function(event){
			if(toggling){
				$(this).toggleClass('active', togglingState);

			}else if(event.buttons&1){
				$(this).addClass('active').siblings().removeClass('active');
			}
		})
		.on('mousedown', 'table:not([data-select-multiple]) > tbody > tr, .nav-group:not([data-select-multiple]) > .nav-group-item', function(event){
			$(this).addClass('active').siblings().removeClass('active');
		})
	;
}
