$(document).ready(function(){
	$('form').submit(function(event){
		event.preventDefault();
		console.log("User Submitted the form!");
		$('input').each(function(){
			var currentInputTagClass = $(this).attr('class');
			console.log(currentInputTagClass);
			var errorDivClassName = '.' + currentInputTagClass +'-error';
			if($(this).val() == "") {
				console.log(errorDivClassName)
			}
				$(errorDivClassName).html('Field cannot be empy!!!');
		})
	});
});