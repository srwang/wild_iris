$(document).ready(function(){

	App.Views.UserView = Backbone.View.extend({
		template: Handlebars.compile($('#rainwater-template').html()),
		events: {
			'click #tree': 'addWater'
		},
		render: function(){
			this.$el.html(this.template({user: this.model.toJSON()}));
			return this
		},
		addWater: function(){
			console.log('clicked')
			var newDropQuantity = this.model.attributes.rainwater + 15;
			this.model.save({rainwater: newDropQuantity});
		},
		addLevelTwo: function(){
			this.$('#level-box').find('h3').append(', 2. Secrets Game')
		},
		addLevelThree: function(){
			this.$('#level-box').find('h3').append(', 3. Worm Attack')
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
				if (user.id === gon.user_id) {
					var userView = new App.Views.UserView({model: user});

					this.$el.append(userView.render().$el);
					if (user.attributes.level > 1) {
						userView.addLevelTwo();
					} 
					if (user.attributes.level > 3){
						userView.addLevelThree();
					}					
				}

			}.bind(this))

		}
	})

	var users = new App.Collections.Users();
	var usersView = new App.Views.UsersView({collection: users});

	
})