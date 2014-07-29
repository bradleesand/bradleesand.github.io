requirejs.config({
  paths: {
    cast: '//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js'
  },
  map: {
    '*': {
      'lodash': 'underscore'
    }
  }
});

requirejs(['papyrus-cast']);
