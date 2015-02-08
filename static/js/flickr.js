var flickr =  {
  init : function () {
    // event handler for submit
    document.getElementById('submit').addEventListener('click', function (e) {
      flickr.flickrSearch();
      e.preventDefault();
      return false;
    });
  },

  // AJAX Request
  flickrSearch : function () {
    var flickrResponse,
      searchTerm = document.getElementById('search').value,
      url = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&content_type=1&media=photos&api_key=867146aba0e148d0a206b4d671a6045a&tags="+ escape(searchTerm) + "&per_page=60";

    if (searchTerm) {
      flickrResponse = new XMLHttpRequest();
      flickrResponse.open("POST", url, true);
      flickrResponse.onreadystatechange = flickr.processResponse;
      flickrResponse.send();
    } else {
      console.log('Error: no search term was entered');
    }
  },

  // AJAX Handler
  processResponse : function (e) {
    var response;
    if(e.target.readyState === 4 && e.target.status===200) {
        //flickr server response
        response = "flickr." + e.target.response;
        flickr.attachResponse(response);
    }
  },

  attachResponse: function (response) {
    var script = document.getElementById('tempJS');
    if(script) {
      script.parentNode.removeChild(script);
    }
    script = document.createElement('script');
    script.setAttribute('id', 'tempJS');
    script.innerHTML = response;
    document.body.appendChild(script);
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
  // for index.html (version 1)
 createAnImage: function (photo) {
   return '<figure><img id="' +
      photo.id + '" style="background-image: url(http://farm' +
      photo.farm + '.static.flickr.com/' +
      photo.server + '/' +
      photo.id + '_' +
      photo.secret + '_n.jpg)" src="static/assets/trans.gif" alt="' + // _n is for small img
      photo.title + '" /><figcaption>' +
      photo.title + '</figcaption></figure>';
  }/*,
   // for version 2 (index2.html)
  createAnImage: function (photo) {
   return '<figure><img id="' +
      photo.id + '" src="http://farm' +
      photo.farm + '.static.flickr.com/' +
      photo.server + '/' +
      photo.id + '_' +
      photo.secret + '_n.jpg)" alt="' + // _n is for small img
      photo.title + '" /></figure>';
  }*/
};

flickr.init();
