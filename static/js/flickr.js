var flickr =  {
  init : function () {
    document.getElementById('submit').addEventListener('click', function (e) {
      console.log('bar');
      flickr.flickrSearch();
      return false;
    });
  },

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

  processResponse : function (e) {
    if(e.target.readyState === 4 && e.target.status===200) {
        //flickr server response
        var response = e.target.response;
        eval(response);
        //parse response

    }
  },

  jsonFlickrApi: function (data) {
    var photos = data.photos.photo,
        i = 0, count = photos.length,
        html = '';
        console.log(count);

    for(; i < count; i++) {
      var images = '<figure><img id="' +
          photos[i].id + '" style="background-image: url(http://farm' +
          photos[i].farm + '.static.flickr.com/' +
          photos[i].server + '/' +
          photos[i].id + '_' +
          photos[i].secret + '.jpg)" src="static/assets/trans.gif" alt="' +
          photos[i].title + '" /><figcaption>' +
          photos[i].title + '</figcaption></figure>';
      html += images;
    }
    document.getElementById('images').innerHTML = html;
  }
};

flickr.init();

function jsonFlickrApi(data) {
  flickr.jsonFlickrApi(data);
}