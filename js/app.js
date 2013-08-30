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
  name: 'Founder\'s KBS',
  description: ' (9.95%)',
  details: '(Homebrew) Made to the exact same specifications as the real deal as the world-reknowned stout.  Brewed with belgian bittersweet chocolate, roasted cacao nibs, and coffee, with even more coffee added post-fermentation.  Aged one week on oak chips.',
  kicked: 1,
  style: 'color: #FF69B4',
},{
  id: 2,
  name: 'Dragon\'s Milk',
  description: ' (10%)',
  details: '(New Holland) A stout with roasty malt character intermingled with deep vanilla tones, all dancing in an oak bath',
  style: 'color: #fff',
},{
  id: 3,
  name: 'Homebrew Cider',
  description: ' (6%)',
  details: '(Homebrew) Made with part Costco apple juice, part unfiltered organic apple juice; sweetened with honey',
  kicked: 1,
  style: 'color: #FF4500'
},{
  id: 4,
  name: 'Huma Lupa Licious',
  description: ' (6.9%)',
  details: '(Short\'s) AggressivelyNamed after the hop flower Humulus Lupulus, this India Pale Ale style beer has enormous amounts of hop bitterness, flavor and aroma.',
  style: 'color: #71637D',
}]

Handlebars.registerHelper('icon', function(context, options){
    return new Handletaps.SafeString("<i class='icon-" + context + "'></i>")
})
