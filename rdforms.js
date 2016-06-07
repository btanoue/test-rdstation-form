var RdForms = {
  createForm: function (url, form_id, width, height) {
    $this = this;
    this._withjQuery(function () {
      $ = jQuery;
      $(document).ready(function(){
        var iframe = $this._createForm(url, form_id, width, height);
        if ($this._hasNewGA()) {
          setTimeout(function(){
            $this._sendUserDataToIframe(iframe);
          }, 2500);
        }
      });
    });
  },

  _withjQuery: function (callback) {
    if (typeof jQuery === "undefined") {
      this._loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js", callback);
    } else {
      callback();
    }
  },

  _createForm: function (url, form_id, width, height) {
    var link = this._createIframeSrc(url);
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = width;
    iframe.height = height;
    iframe.style = 'background: none; border: none;';
    iframe.setAttribute('src', link);
    document.getElementById(form_id).appendChild(iframe);
    return iframe;
  },

  _createIframeSrc: function(url) {
    if (this._hasOldGA() === true) {
      var pageTracker = _gat._getTrackerByName();
      return pageTracker._getLinkerUrl(url);
    } else if (this._hasNewGA() === true) {
      return url + '?ga=new';
    }
  },

  _sendUserDataToIframe: function (iframe) {
    var url = window.location;

    ga(function(tracker) {
      var clientId = tracker.get('clientId');
      iframe.contentWindow.postMessage({ clientId: clientId, url: url.pathname + url.search }, '*');
    });
  },

  _hasNewGA: function () {
    return (typeof ga != 'undefined');
  },

  _hasOldGA: function () {
    return (typeof _gaq != 'undefined');
  },

  _loadScript: function (scriptSource, callback) {
    var head = document.getElementsByTagName('head')[0],
      script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = scriptSource;
    // most browsers
    script.onload = callback;
    // IE 6 & 7
    script.onreadystatechange = function () {
      if (this.readyState === 'complete') {
        callback();
      }
    };
    head.appendChild(script);
  }
};
