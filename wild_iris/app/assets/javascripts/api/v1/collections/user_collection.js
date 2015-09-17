App.Collections.Users = Backbone.Collection.extend({
	url: '/api/v1/users',
	model: App.Models.User
})