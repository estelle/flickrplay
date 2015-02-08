var flickr =  {
  init : function () {
    // event handler for submit
    document.getElementById('submit').addEventListener('click', function (e) {
      flickr.flickrSearch();
      return false;
    });
  },

  // AJAX Request
  flickrSearch : function () {
    var flickrResponse = new XMLHttpRequest(),
    searchTerm = document.getElementById('search').value,
    url = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&content_type=1&media=photos&api_key=867146aba0e148d0a206b4d671a6045a&tags="+ escape(searchTerm) + "&per_page=60&format=json";

    if (searchTerm) {
      flickrResponse.open("POST", url, true);
      flickrResponse.onreadystatechange = flickr.processResponse;
      flickrResponse.send();
    } else {
      console.log('Error: no search term was entered');
    }
  },

  // AJAX Handler
  processResponse : function (e) {
    if(e.target.readyState === 4 && e.target.status===200) {
        //flickr server response
        var response = e.target.response;
        eval(response);
    }
  },

  // handle data layout the page
  jsonFlickrApi: function (data) {
    var photos = data.photos.photo,
        i = 0, count = photos.length,
        html = '';

    for(; i < count; i++) {
      html += flickr.createAnImage(photos[i]);
    }
    document.getElementById('images').innerHTML = html;
  },

  // create one figure
  createAnImage: function (photo) {
   return '<figure><img id="' +
      photo.id + '" style="background-image: url(http://farm' +
      photo.farm + '.static.flickr.com/' +
      photo.server + '/' +
      photo.id + '_' +
      photo.secret + '_n.jpg)" src="static/assets/trans.gif" alt="' +
      photo.title + '" /><figcaption>' +
      photo.title + '</figcaption></figure>';
  }
};

flickr.init();

function jsonFlickrApi(data) {
  flickr.jsonFlickrApi(data);
}