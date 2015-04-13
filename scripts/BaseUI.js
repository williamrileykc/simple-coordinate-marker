var BaseUI = {		
	selectDropdown					:null,
	sortable								:null,

	initialize: function () {
        // iOS detection
        if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 4_\d/i)) {
            $('body').addClass('iOS4');
        }
				
		BaseUI.selectDropdown						= $('.select-dropdown');			
		BaseUI.sortable									= $('#sortable');	
		
		BaseUI.addListeners();
		BaseUI.initSelectDropdown();				
		BaseUI.inputTextReplace();
		BaseUI.initSortable();
				
	},
	addListeners:function(){
		//Nav Check Boxes
		$('.check-boxes li').on('click', BaseUI.navCheckBoxClickHand);
	},

	Expand: function (el) {
			if (el) {
					el.style.visibility = 'visible';
					el.style.display = 'block';
			}
	},

	Collapse: function (el) {
			if (el) {
					el.style.visibility = 'hidden';
					el.style.display = 'none';
			}
	},
	initSelectDropdown: function() {
		if (BaseUI.selectDropdown.length > 0){
			BaseUI.selectDropdown.select2({
				minimumResultsForSearch			:1000
			});
		};
	},		
	inputTextReplace: function(){
		$('input[type="text"]').focus(function() {
				var el = $(this);
				if (!el.data('originalValue')) {
						el.data('originalValue', el.val());
				}
				if (el.val() == el.data('originalValue')) {
						el.val('');
				}
		}).blur(function(){
				var el = $(this);			
				if (el.val() == '') {
						el.val(el.data('originalValue'));
				}
		});	
	},
	//Nav Check Boxes
	navCheckBoxClickHand:function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	},
	//Sortable Plugin
	initSortable: function(){
		if((BaseUI.sortable).length > 0){
			BaseUI.sortable.sortable();
			BaseUI.sortable.disableSelection();
		}
	}
	
	
}



$(document).ready(BaseUI.initialize);
$(window).resize(BaseUI.pageResize);