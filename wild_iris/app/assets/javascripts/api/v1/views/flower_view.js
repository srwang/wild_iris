$(document).ready(function(){

	App.Views.FlowerView = Backbone.View.extend({
		template: Handlebars.compile($('#flower-template').html()),
		'events': {
			'click .read-button': 'read',
			'click .close-modal': 'closeModal',
			'click .feed-button': 'decreaseHunger',
			'click .secrets-game-button': 'openSecretsModal',
			'click .open-secrets-modal': 'openSecrectsModal',
			'click .close-secrets-modal': 'closeSecretsModal',
			'click .submit-secrets-button': 'calcSecretStrength'
		},
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));	
			return this
		},
		openSecretButtons: function(){
			if (this.model.attributes.secret_unlocked === false) {
				this.$('.secrets-game-button').show();
			}
		},
		read: function(){
			this.$('.poem-modal').toggle();
			this.$('.modal-overlay').toggle();				
		},
		closeModal: function(){
			this.$('.poem-modal').toggle();
			this.$('.modal-overlay').toggle();
		},
		decreaseHunger: function(){
			var user = new App.Models.User({id: this.model.attributes.user_id})
			var that = this
			user.fetch({
				success: function(res){ 
					level = res.attributes.level

					if (that.model.attributes.alive === false) {
						wormAttack();
					} else if (level < 2) {					
						if (that.model.attributes.fed_cap >= 25) {
							calcWaterDrops();		
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}		
					} else if ((level >=2 && level <4) && (that.model.attributes.fed_cap !== 75 || that.model.attributes.secret_unlocked === true || that.model.attributes.secret_opt_out === true)) {
						if (that.model.attributes.fed_cap >=25) {
							calcWaterDrops();
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}
					} else if (level >=4 && (that.model.attributes.fed_cap !== 75 || that.model.attributes.secret_unlocked === true || that.model.attributes.secret_opt_out === true)) {
						if (that.model.attributes.fed_cap >= 25) {
							if (Math.floor(Math.random()*4) === 1) {
								wormAttack();
							} else {
								calcWaterDrops();
							}
						} 
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}
					} else if (level >=2 && that.model.attributes.fed_cap === 75 && that.model.attributes.secret_unlocked === false && that.model.attributes.secret_opt_out === false) {
						that.openSecretsModal();
					} 

					function calcWin(){
						var allFlowers = new App.Models.Flower({"byuser": "byuser/" + that.model.attributes.user_id});
						allFlowers.getByProperty("byuser");
						allFlowers.fetch({
							success: function(model){
								var allUnlocked = 0;

								for (i=0; i<=11; i++){
									if (model.attributes[i].unlocked === true){
										allUnlocked++;
									}
								}
								console.log(allUnlocked)
								console.log(level)
								if (level === 6 && allUnlocked >= 11){
									document.cookie="allUnlocked=true";
									that.model.collection.trigger('change');
									alert('Congrats, you have unlocked all of the flowers! You have the chance to go back and unlock all of their secrets.')
								}
							}
						})
					}

					function calcWaterDrops (){
						if (res.attributes.rainwater>=25) {
							var newHunger = that.model.attributes.fed_cap - 25;
							that.model.save({fed_cap: newHunger});

					        var newRain = res.attributes.rainwater - 25;
					        res.set({rainwater: newRain});
					        res.save();
					        res.trigger('change');

					        var users = new App.Collections.Users();
							var usersView = new App.Views.UsersView({collection: users});							
						} else {
							alert("you don't have enough rainwater!")
						}
					}

					function unlockFlower (){
						that.model.set({unlocked: true});
						that.model.save();
						res.set({level: res.attributes.level + 1})
						res.save();
						calcWin();
					}

					function wormAttack (){
						that.model.save({alive: false});

						$('#game-display').hide();
						$('body').append('<div class="pure-g">'+
							'<div class="pure-u-21-24" id="worm-game-container">'+
							'<img id="flower" src="/assets/flowerswhite.jpg" style="display: none">' +
							'<canvas id="topLayer"></canvas>' +
							'<h3>Alas, your flower was attacked by a malicious worm. To bring it back to good health, you must collect celestial energy. Click on a glowing orb before it flickers out, and drag it to the moon for safekeeping. Ten orbs will save your flower!</h3>' +
							'<h3>Hint: The longer you wait, the faster the orbs will move.</h3>' +
							'<img id="dark-tree" src="/assets/tree.png" style="display: none">' +
							'<img id="night-sky" src="/assets/background.bmp" style="display: none">' +
						'</div>'+
						'</div>')

							var canvas = document.getElementById('topLayer');
							var ctx = canvas.getContext('2d');

							canvas.width = $(canvas).width();
							canvas.height = 600

							var particles = [];
							var particleNum = 1;

							var draggedParticles = [];
							var inPlaceParticles = [];

							var Particle = function(){
								this.x = (Math.random()*canvas.width)
								this.y = (Math.random()*canvas.height) - 200
								this.antiGravity = .01;
								this.velX = Math.random()*2 - Math.random()*2
								this.velY = Math.random()*1
								this.maxRadius = Math.random()*20

								this.maxLife = 30;
								this.life = 0;

								this.draw = function(){
									if (this.maxLife >= 15) {
										this.maxLife -= 0.3;				
									}

									this.x += this.velX;
									this.y += this.velY;

									this.gravity = 1.4

									ctx.beginPath();
									ctx.arc(this.x, this.y, (Math.random()*this.maxRadius)/2, 0, 2 * Math.PI, true);
									ctx.fillStyle = 'pink';
									ctx.fill();
									ctx.strokeStyle = 'white';
									ctx.stroke();

									this.velY*this.gravity

									this.life+= Math.random();
									if(this.life >= this.maxLife){
									    delete particles[particles.indexOf(this)];
									}
								}
							}

							setInterval(function(){
								var posX = -5
								var posY = 400

								ctx.fillStyle = "rgba(0, 34, 69, 0.4)";
								ctx.fillRect(0,0, canvas.width, canvas.height);

								var nightSky = document.getElementById('night-sky');
								ctx.drawImage(nightSky, 0, 0)

								// var tree = document.getElementById('dark-tree');
								// ctx.drawImage(tree, -100, -100)

								// var flower = document.getElementById('flower');
								// ctx.drawImage(flower, posX, posY);
								// ctx.drawImage(flower, posX + 300, posY);
								// ctx.drawImage(flower, posX + 600, posY);
								// ctx.drawImage(flower, posX + 900, posY);

								for(var i=0; i<particleNum; i++){
								  var particle = new Particle();
								  particles.push(particle);        
								}
								particles.forEach(function(el){ 
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
							    var y = event.pageY 

								particles.forEach(function(element) {
									if (x < (element.x + 15 + canvasLeft) && x > (element.x -15 + canvasLeft) && y < (element.y + 15 + canvasTop) && y > (element.y -15 + canvasTop)) {
										delete particles[particles.indexOf(element)];

										var draggedParticle = function () {
											this.x = event.pageX;
											this.y = event.pageY;
											this.draw = function (){
												ctx.beginPath();
												ctx.arc(this.x - canvasLeft, this.y - canvasTop, (Math.random()*15)/2 + 5, 0, 2 * Math.PI, true);
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
									element.x = e.pageX;
									element.y = e.pageY;    
								})
							}

							function myDown(e){
								draggedParticles.forEach(function(element){
									if (e.pageX < element.x + 15 && e.pageX > element.x - 15 && e.pageY < element.y + 15 &&
									e.pageY > element.y -15){
										element.x = e.pageX;
										element.y = e.pageY;
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
								if (element.x > canvas.width - 145 + canvasLeft && element.x < canvas.width - 55 + canvasLeft && element.y > 50 + canvasTop && element.y < 140 + canvasTop) {

									delete draggedParticles[draggedParticles.indexOf(element)];
									var inPlaceParticle = function () {
									    this.x = event.pageX;
									    this.y = event.pageY;

									    this.draw = function (){
									      ctx.beginPath();
									      ctx.arc(this.x - canvasLeft, this.y - canvasTop, (Math.random()*10)/2, 0, 2 * Math.PI, true);
									      ctx.fillStyle = 'lightblue';
									      ctx.fill();
									      ctx.strokeStyle = 'white';
									      ctx.stroke();
									    }
									}
									var newParticle = new inPlaceParticle();
									inPlaceParticles.push(newParticle);

									if (inPlaceParticles.length === 1) {
									  alert('Congratulations, you have saved the life of your flower!')
									  $('#worm-game-container').remove();
									  $('#game-display').show();
									  that.model.save({fed_cap: 25, alive: true});
									}
								}
							});
						}
					}
				}
			});
		},
		openSecretsModal: function(){
			var flowers = ["Wild Iris", "Red Poppy", "Lamium", "Snowdrops", "The White Rose", "Violets", "Trillium", "Spring Snow", "Witchgrass"]
			var flowerColors = ["red", "rgba(241, 241, 34, 0.66)", "blue", "purple", "#F1DADA", "rgba(212, 131, 212, 0.82)", "rgba(18, 88, 156, 0.82)", "pink", "yellow", "lightblue"]
			var flowerCenters = ["black", "yellow", "purple", "pink", "lightblue", "white", "red", "gray", "purple"]

			for (i=1; i<=flowers.length; i++){
				document.cookie="moreHunger=0";
				var moreHunger = 0;

				var flowerColor = flowerColors[Math.floor(Math.random()*flowerColors.length)];
				flowerColors.splice(flowerColors.indexOf(flowerColor), 1);

				var flowerCenter = flowerCenters[Math.floor(Math.random()*flowerCenters.length)];
				flowerCenters.splice(flowerCenters.indexOf(flowerCenter), 1);

				var flowerHtml = '<svg width="200" height="200">' +
				'<ellipse cx="90" cy="70" rx="25" ry="30" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="120" cy="100" rx="30" ry="25" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="90" cy="130" rx="25" ry="30" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="60" cy="100" rx="30" ry="25" style="fill:' + flowerColor + '"/>' +
				'<circle cx="90" cy="100" r="18" stroke="white" stroke-width="4" fill=' + flowerCenter +'/>' + 
				'</svg>';
				this.$('#card-' + i).html('').append(flowerHtml);

				var flowerName = this.model.attributes.name;

				var that = this 
				this.$('#card-' + i).click(function(){ // working here
					
					var flower = flowers[Math.floor(Math.random()*flowers.length)];
					flowers.splice(flowers.indexOf(flower), 1);

					var imageName = "";
					if (flower === "Wild Iris") {
						imageName = "iris"
					} else if (flower === "Red Poppy") {
						imageName = "poppy"
					} else if (flower === "Lamium"){
						imageName = "lamium"
					} else if (flower === "Snowdrops") {
						imageName = "snowdrops"
					} else if (flower === "The White Rose") {
						imageName = "rose"
					} else if (flower === "Violets") {
						imageName = "violets"
					} else if (flower === "Trillium") {
						imageName = "trillium"
					} else if (flower === "Spring Snow") {
						imageName = "snow"
					} else if (flower === "Witchgrass") {
						imageName = "witchgrass"
					}

					if (flowerName === flower) {
						alert('Congratulations you picked ' + flower + '. Tell ' + flower + ' your secret in the box at the bottom.')
						$(this).html('')
						$(this).css({"background-image": "url('/assets/" + imageName + ".png')", "background-size": "contain", "background-repeat": "no-repeat", "background-position": "center", "background-color": "rgb(224, 188, 195)", "border": "3px yellow solid"});

						that.$('.secrets-input-box').toggle();
					} else {
						that.$('#card-' + i).html('');
						that.$('#card-' + i).css({"background-image": "url('/assets/" + imageName + ".png')", "background-position": "cover"})

						alert('Sorry you picked ' + flower + '. You are looking for ' + flowerName + '!')
						$(this).html('')
						$(this).css({"background-image": "url('/assets/" + imageName + ".png')", "background-size": "contain", "background-repeat": "no-repeat", "background-position": "center", "background-color": "lightgray"});

						moreHunger += 25;
						document.cookie="moreHunger=" + moreHunger; 
					}
				})
			}
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();
		},
		closeSecretsModal: function(){
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();

			if (this.model.attributes.fed_cap === 75) {
				this.model.save({secret_opt_out: true});
			}

			var moreHunger = parseInt(readCookie('moreHunger'))
			newHunger = this.model.attributes.fed_cap + moreHunger
			this.model.save({fed_cap: newHunger})
		},
		calcSecretStrength: function(){
			var result = Math.floor(Math.random()*2)
			if (result !== 1) {
				alert('sorry ' + this.model.attributes.name + ' doesn\'t like that secret :(')
				this.model.save({fed_cap: this.model.attributes.fed_cap + 100})
			} else {
				alert('congratulations you collected ' + this.model.attributes.name + '\'s secret :) check in your secrets box.')
				this.model.save({fed_cap: this.model.attributes.fed_cap - 25, secret_unlocked: true})
			}

			var moreHunger = parseInt(readCookie('moreHunger'));
			newHunger = this.model.attributes.fed_cap + moreHunger;
			this.model.save({fed_cap: newHunger});
		}
	})

	App.Views.PurgatoryFlowersView = Backbone.View.extend({
		el: '#grass-flowers-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync change remove', this.render)
		},
		render: function(){
			this.$el.html('');

			var allUnlocked = readCookie('allUnlocked');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "flower" && flower.attributes.location === "purgatory" && flower.attributes.user_id === gon.user_id) {

					var flowerView = new App.Views.FlowerView({model: flower});
					this.$el.append(flowerView.render().$el);	
					if (allUnlocked === "true"){					
						flowerView.openSecretButtons();
					}
				}
			}.bind(this))				
		}
	})

	App.Views.HellFlowersView = Backbone.View.extend({
		el: '#dirt-flowers-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync change remove', this.render)
		},
		render: function(){
			this.$el.html('');

			var allUnlocked = readCookie('allUnlocked');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "flower" && flower.attributes.location === "hell" && flower.attributes.user_id === gon.user_id) {

					var flowerView = new App.Views.FlowerView({model: flower});
					this.$el.append(flowerView.render().$el);		
					if (allUnlocked === "true"){		
						flowerView.openSecretButtons();
					}				
				}
			}.bind(this))
		}
	})

	App.Views.SecretsBoxView = Backbone.View.extend({
		template: Handlebars.compile($('#secrets-box-template').html()),
		events: {
			'click .secrets-icon': 'openSecret',
			'click .close-secrets-text': 'closeSecret'			
		},
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));	
			return this
		},
		openSecret: function(){
			this.$('.secrets-text').toggle();
			this.$('.secrets-icon').toggle();
		},
		closeSecret: function(){
			this.$('.secrets-text').toggle();
			this.$('.secrets-icon').toggle();
		}
	})

	App.Views.SecretsBoxesView = Backbone.View.extend({
		el: '#secrets-box',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "flower" && flower.attributes.secret_unlocked === true && flower.attributes.user_id === gon.user_id) {
					this.$el.append(new App.Views.SecretsBoxView({model: flower}).render().$el);					
				}
			}.bind(this))
		}
	})

	App.Views.ExtraPoemView = Backbone.View.extend({
		template: Handlebars.compile($('#garden-poems-template').html()),
		events: {
			'click .read-button': 'read',
			'click .close-modal': 'closeModal'
		},
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));	
			return this
		},
		read: function(){
			this.$('.poem-modal').toggle();
			this.$('.modal-overlay').toggle();				
		},
		closeModal: function(){
			this.$('.poem-modal').toggle();
			this.$('.modal-overlay').toggle();
		}
	})

	App.Views.ExtraPoemsView = Backbone.View.extend({
		el: '#earth-box',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "landscape" && flower.attributes.user_id === gon.user_id){
					this.$el.append(new App.Views.ExtraPoemView({model: flower}).render().$el);	
				}
			}.bind(this))
		}
	})

	App.Routers.FlowerRouter = Backbone.Router.extend({
		routes: {
			"": "redirectToInstructions",
			"instructions": "renderInstructions",
			"about": 'renderAbout',
			"game": "renderGame"
		},
		redirectToInstructions: function() {
		    flowerRouter.navigate("instructions", {trigger: true})
		},
		renderInstructions: function(){
			$('#game-display').hide();
			$('#about-container').hide();
			$('#worm-game-container').remove();
			$('#instructions-container').show();
		},
		renderAbout: function(){
			$('#game-display').hide();
			$('#worm-game-container').remove();
			$('#instructions-container').hide();
			$('#about-container').show();
		},
		renderGame: function(){
			$('#instructions-container').hide();
			$('#about-container').hide();
			$('#game-display').show();
			$('#secrets-box').empty();
			$('#grass-flowers-container').empty();
			$('#dirt-flowers-container').empty();
			$('#earth-box').empty();
			var flowers = new App.Collections.Flowers();
			var purgatoryFlowersView = new App.Views.PurgatoryFlowersView({collection: flowers});
			var hellFlowersView = new App.Views.HellFlowersView({collection: flowers});
			var secretsBoxesView = new App.Views.SecretsBoxesView({collection: flowers});	
			var extraPoemsView = new App.Views.ExtraPoemsView({collection: flowers});			
		}
	})

	var flowerRouter = new App.Routers.FlowerRouter();
	Backbone.history.start();

	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

})