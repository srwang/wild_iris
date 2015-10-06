App.Models.Flower = Backbone.Model.extend({
	urlRoot: '/api/v1/flowers',
	getByProperty: function(prop){
	    // "this" is now our Model instance declared from the router
	    this.url = this.urlRoot + "/" + this.get(prop);
  	}
})