$(document).ready(function(){

	App.Views.FlowerView = Backbone.View.extend({
		template: Handlebars.compile($('#flower-template').html()),
		'events': {
			'click .read-button': 'read',
			'click .close-modal': 'closeModal',
			'click .feed-button': 'decreaseHunger',
			'click .close-secrets-modal': 'closeSecretsModal'
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
					if (level === 1) {
						if (that.model.attributes.fed_cap >= 25) {
							calcWaterDrops();
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}		
					} else if (level >= 2) {
						if (that.model.attributes.fed_cap >= 125) {
							calcWaterDrops();
						} else if (that.model.attributes.fed_cap >= 100) {
							console.log('trying to open modal')
							calcWaterDrops();
							that.openSecretsModal();
						} else if (that.model.attributes.fed_cap >=25) {
							console.log('still hitting')
							calcWaterDrops();
						}
						if (that.model.attributes.fed_cap === 0) {
							unlockFlower();
						}
					}

					function calcWaterDrops (){
						var newHunger = that.model.attributes.fed_cap - 25;
						that.model.save({fed_cap: newHunger});

				        var newRain = res.attributes.rainwater - 25;
				        res.set({rainwater: newRain});
				        res.save();
				        res.trigger('change');

				        var users = new App.Collections.Users();
						var usersView = new App.Views.UsersView({collection: users});
					}

					function unlockFlower (){
						that.model.save({unlocked: true});
						that.$('.poem-model').toggle();
						that.$('.modal-overlay').toggle();
						res.set({level: level + 1})
						res.save();
					}
				}
			});
		},
		openSecretsModal: function(){
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();
			debugger
		},
		closeSecretsModal: function(){
			this.$('.secrets-game-modal').toggle();
			this.$('.secrets-modal-overlay').toggle();
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
})