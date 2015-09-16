$(document).ready(function(){

	App.Views.RainwaterView = Backbone.View.extend({
		template: Handlebars.compile($('#rainwater-template').html()),
		events: {
			'click #tree': 'addWater',
			'click .feed': 'subtractWater'
		},
		render: function(){
			this.$el.html(this.template({rainwater: this.model.toJSON()}));
			return this
		},
		addWater: function(){
			var newAmount = this.model.attributes.total_amount + 15;
			this.model.save({total_amount: newAmount});
		},
		subtractWater: function(){
			var newAmount = this.model.attributes.total_amount - 25;
			this.model.save({total_amount: newAmount});
			debugger
		}
	})

	App.Views.RainwatersView = Backbone.View.extend({
		el: '#rainwater-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(rainwater){
				this.$el.append(new App.Views.RainwaterView({model: rainwater}).render().$el);
			}.bind(this))
		}
	})

	var rainwaters = new App.Collections.Rainwaters();
	var rainwatersView = new App.Views.RainwatersView({collection: rainwaters});

})