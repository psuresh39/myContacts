window.ContactManager = {
Models: {},
Collections: {},
Views: {},


start: function(data) {
    console.log('Contact Manager started!');
    var contacts = new ContactManager.Collections.Contacts(data.contacts);
    var router = new ContactManager.Router();

    router.on('route:home', function() {
        console.log('Home');
        router.navigate('contacts', {
            trigger: true,
            replace: true
        });
    });

    router.on('route:showContacts', function() {
        console.log('Show contacts');
        var contactsView = new ContactManager.Views.Contacts({
            collection: contacts
        });

        $('.main-container').html(contactsView.render().$el);
    });

    router.on('route:newContact', function() {
        console.log('New contact');
        var contactForm = new ContactManager.Views.ContactForm({model: new ContactManager.Models.Contact()});
        contactForm.on('form:submitted', function(attrs) {
            attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);
            contacts.add(attrs);
            router.navigate('contacts', true);
        });
        $('.main-container').html(contactForm.render().$el);
    });

    router.on('route:editContact', function(id) {
        console.log('Edit contact');
        var contact = contacts.get(id),
        editContactForm;
        
        if (contact) {
            editContactForm = new ContactManager.Views.ContactForm({
                model: contact
            });
            editContactForm.on('form:submitted', function(attrs) {
                contact.set(attrs);
                router.navigate('contacts', true);
            });
            $('.main-container').html(editContactForm.render().$el);
        } else {
            router.navigate('contacts', true);
        }
        
    });

    Backbone.history.start();
}
};
