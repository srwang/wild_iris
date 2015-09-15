App.Collections.Flowers = Backbone.Collection.extend({
	url: '/api/v1/flowers',
	model: App.Models.Flower
})