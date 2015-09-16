$(document).ready(function(){

	App.Views.FlowerView = Backbone.View.extend({
		template: Handlebars.compile($('#flower-template').html()),
		'events': {
			'click .read-button': 'read',
			'click .close-modal': 'closeModal',
			'click .feed-button': 'decreaseHunger'
		},
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));
			return this
		},
		read: function(){
			if (this.model.attributes.unlocked === true) {
				this.$('.poem-modal').toggle();
				this.$('.modal-overlay').toggle();				
			} 
		},
		closeModal: function(){
			this.$('.poem-modal').toggle();
			this.$('.modal-overlay').toggle();
		},
		decreaseHunger: function(){
			if (this.model.attributes.fed_cap >= 25) {
				newHunger = this.model.attributes.fed_cap - 25;
				console.log(newHunger)
				this.model.save({fed_cap: newHunger})			
			} else {
				newHunger = 0;
				this.model.save({fed_cap: newHunger})	
			}
			if (this.model.attributes.fed_cap === 0) {
				console.log("it's zero")
				this.model.save({unlocked: true});
			}
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