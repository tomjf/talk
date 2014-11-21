/**
* Templates
*/

;

Template.body.helpers({
  loc: function () {
    // return 0, 0 if the location isn't ready
    return Geolocation.latLng() || { lat: 0, lng: 0 };
  },
  error: Geolocation.error
})

Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    }
})

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var name = Meteor.user().username;
      else
        var name = 'Anonymous';
      var message = document.getElementById('message');


      // Reverse
      var geo = new GeoCoder();
      var result = geo.reverse(45.767, 4.833)
      console.debug(result)

      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
          location: Geolocation.latLng() || { lat: 0, lng: 0 },
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}

// At the bottom of the client code
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
