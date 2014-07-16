ContactManager.Views.Contact = Backbone.View.extend({
tagName: 'li',
className: 'media col-md-6 col-lg-4',

initialize: function() {
  this.listenTo(this.model, 'remove', this.remove);
},

template: _.template($('#tpl-contact').html()),

render: function() {
  var html = this.template(this.model.toJSON());
  this.$el.append(html);
  return this;
},

events: {
  'click .delete-contract': 'onClickDelete'
},

onClickDelete: function(e) {
  e.preventDefault();
  console.log('Delete');
  this.model.collection.remove(this.model);
},

});
