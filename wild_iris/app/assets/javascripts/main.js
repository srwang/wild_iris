$(document).ready(function(){
	console.log('linked')

	$('#tree').click(function(){
		console.log('tree')
	})

	for (i=1; i<=$('.card').length; i++){
		var canvas = document.getElementById('flower-generator-' + i);
		canvas.click(function(){
			console.log('whoa ')
		})
		var ctx = canvas.getContext('2d');

		canvas.width = this.$('#card-' + i).width();
		canvas.height = this.$('#card-' + i).height();

		ctx.beginPath();
		ctx.arc(this.x, this.y, 100, 0, 2 * Math.PI, true);
		ctx.fillStyle = 'blue';
		ctx.fill();				
	}
})