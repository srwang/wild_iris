$(document).ready(function(){
	var canvas = document.getElementById('topLayer');
	var ctx = canvas.getContext('2d');

	canvas.width = $(window).width();
	canvas.height = 600

  var particles = [];
  var particleNum = 1;

  var draggedParticles = [];
  var inPlaceParticles = [];

  var Particle = function(){
    this.x = (Math.random()*canvas.width)
    this.y = (Math.random()*canvas.height)
    this.antiGravity = .01;
    this.velX = Math.random()*3 - Math.random()*3
    this.velY = Math.random() - Math.random()

    this.maxLife = 30;
    this.life = 0;

    this.draw = function(){
      this.x += this.velX;
      this.y += this.velY;

      this.gravity = 0.005
        
      ctx.beginPath();
      ctx.arc(this.x, this.y, (Math.random()*20)/2, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'yellow';
      ctx.stroke();

      if (this.velY >= 0) {
        this.velY*this.gravity
      }

      this.life+= Math.random();
      if(this.life >= this.maxLife){
        delete particles[particles.indexOf(this)];
      }
    }
  }


  var posX = -5
  var posY = 400

  setInterval(function(){
    ctx.fillStyle = "rgba(0, 34, 69, 0.4)";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    var tree = document.getElementById('tree');
    ctx.drawImage(tree, -100, -100)

    var flower = document.getElementById('flower');
    ctx.drawImage(flower, posX, posY);
    ctx.drawImage(flower, posX + 300, posY);
    ctx.drawImage(flower, posX + 600, posY);
    ctx.drawImage(flower, posX + 900, posY);

    for(var i=0; i<particleNum; i++){
      var particle = new Particle();
      particles.push(particle);        
    }
    particles.forEach(function(el){ // working here
        el.draw();          
    })
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 95, 45, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'black';
    ctx.fill();


    draggedParticles.forEach(function(el){
        el.draw();          
    })
    inPlaceParticles.forEach(function(el){ 
        el.draw();          
    })

  }, 20)

  canvasLeft = canvas.offsetLeft,
  canvasTop = canvas.offsetTop

  canvas.addEventListener('click', function(event) {
      var x = event.pageX 
          y = event.pageY 

      // Collision detection between clicked offset and element.
      particles.forEach(function(element) {
          if (x < (element.x + 15) && x > (element.x -15) && y < (element.y + 15) && y > (element.y -15)) {
            delete particles[particles.indexOf(element)];
            var draggedParticle = function () {
              this.x = event.pageX;
              this.y = event.pageY;
              this.draw = function (){
                ctx.beginPath();
                ctx.arc(this.x, this.y, (Math.random()*20)/2 + 5, 0, 2 * Math.PI, true);
                ctx.fillStyle = 'lightblue';
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.stroke();             
              }
            }

            var dragged = new draggedParticle();
            draggedParticles.push(dragged);

          }

      });

    function myMove(e){
      draggedParticles.forEach(function(element){
        element.x = e.pageX - canvas.offsetLeft;
        element.y = e.pageY - canvas.offsetTop;    
      })
    }

    function myDown(e){
      draggedParticles.forEach(function(element){
       if (e.pageX < element.x + 15 + canvas.offsetLeft && e.pageX > element.x - 15 +
       canvas.offsetLeft && e.pageY < element.y + 15 + canvas.offsetTop &&
       e.pageY > element.y -15 + canvas.offsetTop){
        element.x = e.pageX - canvas.offsetLeft;
        element.y = e.pageY - canvas.offsetTop;
        canvas.onmousemove = myMove;
       }      
      })
    }

    function myUp(){
     canvas.onmousemove = null;
    }

    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    countDraggedParticles();

  }, false);

  function countDraggedParticles () {
    draggedParticles.forEach(function(element){
      if (element.x > canvas.width - 145 && element.x < canvas.width - 55 && element.y > 50 && element.y < 140) {
        delete draggedParticles[draggedParticles.indexOf(element)];
        var inPlaceParticle = function () {
            this.x = event.pageX;
            this.y = event.pageY;
            this.velX = Math.random()*3 - Math.random()*3
            this.velY = Math.random()*3 - Math.random()*3 

            this.draw = function (){
              this.x += this.velX;
              this.y += this.velY;
              ctx.beginPath();
              ctx.arc(this.x, this.y, (Math.random()*10)/2, 0, 2 * Math.PI, true);
              ctx.fillStyle = 'lightblue';
              ctx.fill();
              ctx.strokeStyle = 'white';
              ctx.stroke();

              if (this.x <= canvas.width - 135){
                this.velX = 1;
              } else if (this.x >= canvas.width - 65){
                this.velX = -1
              } else if (this.y <= 60){
                this.velY = 1;
              } else if (this.y >= 130) {
                this.velY = -1
              }
            }
        }
        var newParticle = new inPlaceParticle();
        inPlaceParticles.push(newParticle);

        if (inPlaceParticles.length === 10) {
          alert('you have won!')
        }
      }
    })

  }

});
