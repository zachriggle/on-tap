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
  name: 'KBS',
  description: ' (10%)',
  details: '(Homebrew) Made to the exact same specifications as the real deal as the world-reknowned stout by Founder\'s. Brewed with belgian bittersweet chocolate, roasted cacao nibs, and coffee.  Added Kentucky bourbon post-fermentation; aged one week on oak chips.',
  kicked: 1,
  style: 'color: #FF69B4; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;', 
},{
  id: 2,
  name: 'Dragon\'s Milk',
  description: ' (10%)',
  details: '(New Holland) A stout with roasty malt character intermingled with deep vanilla tones, all dancing in an oak bath',
  style: 'color: #71637D; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;',
},{
  id: 3,
  name: 'Pumpkin',
  description: ' (5%)',
  details: '(Homebrew) Three pounds of pie pumpkin, and generous spices make this a yummy fall treat!',
  kicked: 1,
  style: 'color: #fff; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;', // white
},{
  id: 4,
  name: 'Huma Lupa Licious',
  description: ' (7%)',
  details: '(Short\'s) AggressivelyNamed after the hop flower Humulus Lupulus, this India Pale Ale style beer has enormous amounts of hop bitterness, flavor and aroma.',
  style: 'color: #FF4500; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;', // orange
}]
  

Handlebars.registerHelper('icon', function(context, options){
    return new Handletaps.SafeString("<i class='icon-" + context + "'></i>")
})
