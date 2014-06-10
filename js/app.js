// Ember.ENV.EXPERIMENTAL_CONTROL_HELPER = true;
// Ember.LOG_BINDINGS = true;
// Ember.ENV.RAISE_ON_DEPRECATION = true
// Ember.LOG_STACKTRACE_ON_DEPRECATION = true

window.App = Ember.Application.create({
    rootElement: '#app',
    // LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route("about", { path: "/about" });
  this.route("favorites", { path: "/favs" });
});

App.Router.map(function() {
  this.resource('taps', function() {
      this.resource('tap', {path:':tap_id'});
  })
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('taps');
  }
})

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    this.controllerFor('nav').set('content', App.Tap.find());
  },  
  renderTemplate: function() {
    this.render();
    this.render("nav", {outlet: "nav", into: "application"})
  }
});

App.TapsRoute = Ember.Route.extend({
    model: function(params) {
        return App.Tap.find(params.tap_id);
    }
});

App.TapsController = Ember.ArrayController.extend({
  sortProperties: ['id']
});


App.NavController = Ember.ArrayController.extend({
});


App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create()
});


App.Tap = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  details: DS.attr('string'),
  icon: DS.attr('string'),
  style: DS.attr('string'),
  kicked: DS.attr('number'),
});
// pink purple white orange
App.Tap.FIXTURES = [{
  id: 1,
  name: 'Centennial IPA',
  description: ' (5%)',
  details: 'Single-hopped IPA with Centennial',
  kicked: 1,
  style: 'color: #FF69B4; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;', 
},{
  id: 2,
  name: 'Quad #1',
  description: ' (10%)',
  details: 'Belgian quadruppel ale.  Sweet and boozy.  Uses Westmalle yeast.',
  style: 'color: #71637D; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;',
},{
  id: 3,
  name: 'Mosaic IPA',
  description: ' (5%)',
  details: 'Single-hopped IPA with Mosaic',
  kicked: 1,
  style: 'color: #fff; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;', // white
},{
  id: 4,
  name: 'Quad #2',
  description: ' (6.5%)',
  details: 'Belgian quadruppel ale.  Sweet and boozy.  Uses Chimay yeast.',
  style: 'color: #FF4500; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;', // orange
}]
  

Handlebars.registerHelper('icon', function(context, options){
    return new Handletaps.SafeString("<i class='icon-" + context + "'></i>")
})
