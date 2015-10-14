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
		checkRain: function(){
			var that = this
			$.get("http://ipinfo.io/", function(response) {
			    console.log(response.city, response.region);

			    $.get('http://api.wunderground.com/api/4b6e233436935f0e/conditions/q/' + response.region + '/' + response.city + '.json', function(response){
			    	var weather = response.current_observation.weather

			    	if (/Rain/.test(weather)) {
			    		alert("It's raining where you are! You begin with 5000 rainwater points.")
			    		that.model.save({rainwater: 5000})
			    	} 
			    })
			}, "jsonp");
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
				if (user.id === parseInt(readCookie("user_id"))) {
					var userView = new App.Views.UserView({model: user});

					this.$el.append(userView.render().$el);
					userView.checkRain();
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

	App.Views.InstructionView = Backbone.View.extend({
		template: Handlebars.compile($('#instructions-template').html()),
		events: {
			'click #new-game-button': 'startNewGame'
		},
		render: function(){
			this.$el.html(this.template({user: this.model.toJSON()}));
			return this
		},
		startNewGame: function(){
			console.log('clicked')
			this.model.save({level: 1, rainwater: 300})

			document.cookie="allUnlocked=false"

			var poppy = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Red Poppy"});
			poppy.getByProperty("byuser");
			poppy.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 100, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var iris = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Wild Iris"});
			iris.getByProperty("byuser");
			iris.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 150, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var lamium = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Lamium"});
			lamium.getByProperty("byuser");
			lamium.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 100, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var snowdrops = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Snowdrops"});
			snowdrops.getByProperty("byuser");
			snowdrops.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 125, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var rose = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/The White Rose"});
			rose.getByProperty("byuser");
			rose.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 175, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var violets = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Violets"});
			violets.getByProperty("byuser");
			violets.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 75, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			var trillium = new App.Models.Flower({"byuser": "byuser/" + this.model.attributes.id + "/Trillium"});
			trillium.getByProperty("byuser");
			trillium.fetch({
				success: function(model, res, error){
					model.save({alive: true, fed_cap: 200, unlocked: false, secret_unlocked: false, secret_opt_out: false})
				}
			})

			window.location.href = "/#game"
		}
	})

	App.Views.InstructionsView = Backbone.View.extend({
		el: '#instructions-container',
		initialize: function(){
			this.collection.fetch();
			this.listenTo(this.collection, 'sync remove change', this.render)
		},
		render: function(){
			this.$el.html('');

			this.collection.each(function(user){
				if (user.id === parseInt(parseInt(readCookie("user_id")))){
					var instructionView = new App.Views.InstructionView({model: user});
					this.$el.append(instructionView.render().$el);
				}
			}.bind(this))
		}
	})

	var users = new App.Collections.Users();
	var usersView = new App.Views.UsersView({collection: users});
	var instructionsView = new App.Views.InstructionsView({collection: users});

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