var RdForms = {
  createForm: function (url, form_id, width, height) {
    $this = this;
    this._withjQuery(function () {
      $ = jQuery;
      $(document).ready(function(){
        $this._createForm(url, form_id, width, height)
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
  },

  _createIframeSrc: function(url) {
    if (typeof _gat !== 'undefined') {
      var pageTracker = _gat._getTrackerByName();
      return pageTracker._getLinkerUrl(url);
    } else {
      
    }
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
