requirejs.config({
  shim: {
    cast: {
      exports: 'cast'
    }
  },
  paths: {
    cast: 'https://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver'
  },
  map: {
    '*': {
      'lodash': 'underscore'
    }
  }
});

requirejs(['papyrus-cast']);

requirejs(['jquery'], function($) {
  $('body').append('<div style="position:absolute;top:0;bottom:0;left:0;right:0;background:black;color:white">TEST</div>');
});
