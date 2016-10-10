$(document).ready(function(){
	$('.img-responsive').fadeTo('fast',0.001);
	$('.img-thumbnail').children().fadeTo('fast',0.0001);
	$('.img-responsive').mouseenter(function(){
		$(this).fadeTo('slow',0.5);
	});
	
	$('.img-responsive').mouseleave(function(){
		$(this).fadeTo('slow',0.001);
	});
	$('.img-thumbnail').mouseenter(function(){
		$(this).children().fadeTo('slow',1);
	});
	$('.img-thumbnail').mouseleave(function(){
		$(this).children().fadeTo('slow',0.0001);
	});
});