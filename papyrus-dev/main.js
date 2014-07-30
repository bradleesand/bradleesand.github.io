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
