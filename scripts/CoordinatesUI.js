var CoordinatesUI = {
  coordinateNavCount            :null,
		
	initialize: function () {
		CoordinatesUI.coordinateNavCount	=	$('.coordinates-nav .coordinate-nav').length;
		
		CoordinatesUI.addListeners();
		CoordinatesUI.initCoordinates();
	},
	refreshListeners:function(){
		CoordinatesUI.removeListeners();
		CoordinatesUI.addListeners();
	},
	addListeners:function(){
		$('#create-coord').on('click',CoordinatesUI.coordinatesCreate);
		$('.coordinate-nav .delete').on('click',CoordinatesUI.coordinatesDestroy);
		
		$('.coordinate-nav, .coordinate-obj').on('mouseenter', CoordinatesUI.coordinatesHighlightOn);
		$('.coordinate-nav, .coordinate-obj').on('mouseleave', CoordinatesUI.coordinatesHighlightOff);
		
	},
	removeListeners:function(){
		$('#create-coord').off('click',CoordinatesUI.coordinatesCreate);
		$('.coordinate-nav .delete').off('click',CoordinatesUI.coordinatesDestroy);
	},
	
	initCoordinates: function(){
		$('.coordinate-obj').each(function(index, value) {
				$this = $(value);
				$(this).css('position','absolute');
				var dragIndex 				= index;
				$this.draggable({
					containment: ".coordinates-container",
					stack: ".coordinate-obj",
					stop: function() {
						var pos 		= $(this).position(),
								posTop 	= Math.round(pos.top),
								posLeft = Math.round(pos.left);
						CoordinatesUI.coordinatesPass(index, posTop, posLeft)
					}
				});
		});			
	},
	coordinatesPass: function(target, top, left){
		//targetIdent = '#'+target;
		$('.coordinates-nav .coordinate-nav').eq(target).children().children('.x-nav').children('span').html(left);
		$('.coordinates-nav .coordinate-nav').eq(target).children().children('.y-nav').children('span').html(top);
	},
	coordinatesCreate: function(){
		var htmlNav = '<div class="pod adjust coordinate-nav"><div class="adjust-head pod-inner clearfix">';
				htmlNav += '<p class="x-nav">X: <span></span></p>';
				htmlNav += '<p class="y-nav">Y: <span></span></p>';
				htmlNav += '</div><div class="adjust-options pod-inner">';
				htmlNav += '<a class="button pod delete" href="#">Delete</a>';
				htmlNav += '</div></div>';
		var htmlCoord = '<div class="draggable coordinate-obj"><a href="#">tag</a></div>'
		
		
		$('.coordinates-nav').append(htmlNav);
		$('.coordinates-container').append(htmlCoord);

		CoordinatesUI.coordinateNavCount = CoordinatesUI.coordinateNavCount + 1;
		CoordinatesUI.initCoordinates();		
		CoordinatesUI.refreshListeners();
		return false;					
	},
	coordinatesDestroy: function(){
		var el 						= $(this),
				elParent			= el.parent().parent('.coordinate-nav'),
				elParentIndex	= elParent.index() - 1;
				$('.coordinates-container .coordinate-obj').eq(elParentIndex).remove();	
				$(elParent).remove();
		CoordinatesUI.coordinateNavCount = CoordinatesUI.coordinateNavCount - 1;
		CoordinatesUI.initCoordinates();	
		return false;			
	},
	coordinatesHighlightOn:function(){ 
		var el 			= $(this),
				elIndex	= el.index() - 1;
				el.addClass('hover');
		if(el.hasClass('coordinate-nav') == true){
				$('.coordinates-container .coordinate-obj').eq(elIndex).addClass('hover');
		}
		if(el.hasClass('coordinate-obj') == true){
				$('.coordinates-nav .coordinate-nav').eq(elIndex).addClass('hover');
		};
	},		
	coordinatesHighlightOff:function(){
		var el 			= $(this),
				elIndex	= el.index() - 1;
				el.removeClass('hover');
		if(el.hasClass('coordinate-nav') == true){
				$('.coordinates-container .coordinate-obj').eq(elIndex).removeClass('hover');
		}
		if(el.hasClass('coordinate-obj') == true){
				$('.coordinates-nav .coordinate-nav').eq(elIndex).removeClass('hover');
		};
	}
}
$(document).ready(CoordinatesUI.initialize);