function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyApa21JGR41WhJOxu6a_CLgY271J0WjrJo',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://books.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '291454126880-sdrjofc0uoh906c4jqkhv8ut96qt0g1a.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/books',
  }).then(function () {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function (response) {
    console.log(response.result);
  }, function (reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};

// 1. Load the JavaScript client library.
gapi.load('client', start);
