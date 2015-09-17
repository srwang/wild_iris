$(document).ready(function(){

	App.Views.UserView = Backbone.View.extend({
		template: Handlebars.compile($('#rainwater-template').html()),
		initialize: function(){
			// this.model.fetch()
			this.listenTo(this.model, 'change', this.render);
		},
		events: {
			'click #tree': 'addWater'
		},
		render: function(){
			this.$el.html(this.template({user: this.model.toJSON()}));
			return this
		},
		addWater: function(){
			var newDropQuantity = this.model.attributes.rainwater + 15;
			this.model.save({rainwater: newDropQuantity});
		}
	})

	App.Views.UsersView = Backbone.View.extend({
		el: '#rainwater-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove change', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(user){
				this.$el.append(new App.Views.UserView({model: user}).render().$el);
			}.bind(this))
		}
	})

	var users = new App.Collections.Users();
	var usersView = new App.Views.UsersView({collection: users});

	
})