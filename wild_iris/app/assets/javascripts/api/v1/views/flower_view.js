$(document).ready(function(){

	App.Views.FlowerView = Backbone.View.extend({
		template: Handlebars.compile($('#flower-template').html()),
		'events': {
			'click .read-button': 'read',
			'click .close-modal': 'closeModal',
			'click .feed-button': 'decreaseHunger',
			'click .open-secrets-modal': 'openSecrectsModal',
			'click .close-secrets-modal': 'closeSecretsModal',
			'click .submit-secrets-button': 'calcSecretStrength'
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
		},
		decreaseHunger: function(){
			var user = new App.Models.User({id: this.model.attributes.user_id})
			var that = this
			user.fetch({
				success: function(res){ 
					level = res.attributes.level
					console.log(level)
					if (level < 3) {
						if (that.model.attributes.fed_cap >= 25) {
							calcWaterDrops();								
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}		
					} else if ((level >=3 && level <5 && that.model.attributes.fed_cap !== 75) || (level >=3 && level < 5 && that.model.attributes.secrets_unlocked === true || that.model.attributes.secrets_opt_out === true)) {
						if (that.model.attributes.fed_cap >=25) {
							calcWaterDrops();
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}
					} else if (level >=3 && that.model.attributes.fed_cap === 75 && that.model.attributes.secret_unlocked === false || that.model.attributes.secrets_opt_out === false) {
						that.openSecretsModal();
					} else if ((level >=5 && that.model.attributes.fed_cap !== 75) || (level >=5 && that.model.attributes.secrets_unlocked === true)) {
						if (that.model.attributes.fed_cap >= 25) {
							if (Math.floor(Math.random()*3) === 1) {
								wormAttack();
							} else {
								calcWaterDrops();
							}
						} if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}
					} else if ((level >=5 && that.model.attributes.fed_cap !== 75) || (level >=5 && that.model.attributes.secrets_unlocked === false)) {
						that.openSecretsModal();
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
						that.model.save({unlocked: true});
						res.set({level: level + 1})
						res.save();
					}

					function wormAttack (){
						console.log('worm is attacking')
						
					}
				}
			});
		},
		openSecretsModal: function(){
			var flowers = ["Wild Iris", "Red Poppy", "Lamium", "Snowdrops", "The White Rose", "Violets", "Trillium", "Vespers", "Tree"]
			var flowerColors = ["red", "rgba(241, 241, 34, 0.66)", "blue", "purple", "#F1DADA", "rgba(212, 131, 212, 0.82)", "rgba(18, 88, 156, 0.82)", "pink", "yellow", "lightblue"]
			var flowerCenters = ["black", "yellow", "purple", "pink", "lightblue", "white", "red", "gray", "purple"]

			for (i=1; i<=$('.card').length; i++){
				document.cookie="moreHunger=0";
				var moreHunger = 0;

				var flowerColor = flowerColors[Math.floor(Math.random()*flowerColors.length)];
				flowerColors.splice(flowerColors.indexOf(flowerColor), 1);

				var flowerCenter = flowerCenters[Math.floor(Math.random()*flowerCenters.length)];
				flowerCenters.splice(flowerCenters.indexOf(flowerCenter), 1);

				var flowerHtml = '<svg width="200" height="200">' +
				'<ellipse cx="100" cy="70" rx="25" ry="30" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="130" cy="100" rx="30" ry="25" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="100" cy="130" rx="25" ry="30" style="fill:' + flowerColor + '"/>' +
				'<ellipse cx="70" cy="100" rx="30" ry="25" style="fill:' + flowerColor + '"/>' +
				'<circle cx="100" cy="100" r="18" stroke="white" stroke-width="4" fill=' + flowerCenter +'/>' + 
				'</svg>';
				this.$('#card-' + i).html('').append(flowerHtml);

				this.$('#card-' + i).click(function(){
					var flower = flowers[Math.floor(Math.random()*flowers.length)];
					flowers.splice(flowers.indexOf(flower), 1);

					if (this.model.attributes.name === flower) {
						alert('congratulations you picked' + flower + '. tell' + flower + 'your secret in the box at the bottom.')
						this.$('.secrets-input-box').toggle();
					} else {
						alert('sorry you picked ' + flower + '. you are looking for ' + this.model.attributes.name + '!')//change this alert to something else
						moreHunger += 25;
						document.cookie="moreHunger=" + moreHunger; 
						//do something here to change the image to the flower
					}
				}.bind(this))
			}
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();
		},
		closeSecretsModal: function(){
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();

			if (this.model.attributes.fed_cap === 75) {
				this.model.save({secrets_opt_out: true});
			}

			var moreHunger = document.cookie.split('=');
			moreHunger = parseInt(moreHunger[1])
			newHunger = this.model.attributes.fed_cap + moreHunger
			this.model.save({fed_cap: newHunger})
		},
		calcSecretStrength: function(){
			var result = Math.floor(Math.random()*3)
			if (result !== 1) {
				alert('sorry ' + this.model.attributes.name + ' doesn\'t like that secret :(')
				this.model.save({fed_cap: this.model.attributes.fed_cap + 100})
			} else {
				alert('congratulations you collected ' + this.model.attributes.name + '\'s secret :) check in your secrets box.')
				this.model.save({fed_cap: this.model.attributes.fed_cap - 25, secret_unlocked: true})
			}
			var moreHunger = document.cookie.split('=');
			moreHunger = parseInt(moreHunger[1]);
			newHunger = this.model.attributes.fed_cap + moreHunger;
			this.model.save({fed_cap: newHunger});
		}
	})

	App.Views.PurgatoryFlowersView = Backbone.View.extend({
		el: '#grass-flowers-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "flower" && flower.attributes.location === "purgatory") {
					this.$el.append(new App.Views.FlowerView({model: flower}).render().$el);					
				}
			}.bind(this))
		}
	})

	App.Views.HellFlowersView = Backbone.View.extend({
		el: '#dirt-flowers-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(flower){
				if (flower.attributes.poem_type === "flower" && flower.attributes.location === "hell") {
					this.$el.append(new App.Views.FlowerView({model: flower}).render().$el);					
				}
			}.bind(this))
		}
	})

	App.Views.SecretsBoxView = Backbone.View.extend({
		template: Handlebars.compile($('#secrets-box-template').html()),
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));	
			return this
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
				if (flower.attributes.secret_unlocked === true) {
					this.$el.append(new App.Views.SecretsBoxView({model: flower}).render().$el);					
				}
			}.bind(this))
		}
	})

	App.Routers.FlowerRouter = Backbone.Router.extend({
		routes: {
			"flowers/:id/game" : "showGame",
			"flowers/:id/poem" : "showPoem"
		},
	})

	var flowerRouter = new App.Routers.FlowerRouter();
	Backbone.history.start();

	var flowers = new App.Collections.Flowers();
	var purgatoryFlowersView = new App.Views.PurgatoryFlowersView({collection: flowers});
	var hellFlowersView = new App.Views.HellFlowersView({collection: flowers});
	var secretsBoxesView = new App.Views.SecretsBoxesView({collection: flowers});
})