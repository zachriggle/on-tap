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
  name: 'Kicked!',
  description: '',
  details: 'This keg is empty.',
  kicked: 1,
  style: 'color: #FF69B4',
},{
  id: 4,
  name: 'Hopdunk',
  description: ' (10.8%)',
  details: 'Aggressively hopped American Double IPA.  Features over a pound of hops and five different varieties.',
  style: 'color: #71637D',
},{
  id: 2,
  name: 'Cropshock',
  description: ' (7%)',
  details: 'Session Rye Pale Ale.  Three pounds of Rye malt made this a pain in the ass to mash, but it was worth it!',
  style: 'color: #fff',
},{
  id: 3,
  name: 'Organic Cider',
  description: ' (6%)',
  details: 'Made from the best organic, unfiltered apple juice available; sweetened with honey',
  kicked: 1,
  style: 'color: #FF4500'
}]

Handlebars.registerHelper('icon', function(context, options){
    return new Handletaps.SafeString("<i class='icon-" + context + "'></i>")
})
