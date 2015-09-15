$(document).ready(function(){

	App.Views.FlowerView = Backbone.View.extend({
		template: Handlebars.compile($('#flower-template').html()),
		'events': {
			'click #play-button': 'play',
			'click #read-button': 'read'
		},
		render: function(){
			this.$el.html(this.template({flower: this.model.toJSON()}));
			return this
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

		// showPoem: function(id){
		// 	var flower = new App.Models.Flower({id: id})
  //   		flower.fetch({
	 //      		success: function(object) {
	 //      			$('#poem-modal-container').append('<p>' + object.attributes.poem + '</p>');
	 //        		// var flowerView = $("#grocery-list").append(new App.Views.GroceryView({model: res}).render().$el);
	 //      		}
  //   		});
		// }
	})

	var flowerRouter = new App.Routers.FlowerRouter();
	Backbone.history.start();

	var flowers = new App.Collections.Flowers();
	var purgatoryFlowersView = new App.Views.PurgatoryFlowersView({collection: flowers});
	var hellFlowersView = new App.Views.HellFlowersView({collection: flowers});
})