App.Collections.Rainwaters = Backbone.Collection.extend({
	url: '/api/v1/rainwaters',
	model: App.Models.Rainwater
})