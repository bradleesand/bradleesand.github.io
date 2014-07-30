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

requirejs([
    'papyrus',
    'jquery',
    'cast'
], function (Papyrus, $, cast) {
  console.log($);
  console.log(cast);
  console.log(Papyrus);

  $('body').append('<div style="position:absolute;top:0;right:0;background:black;color:white">TEST</div>');

  $(function () {
    new Papyrus('canvas#papyrus');

    cast.receiver.logger.setLevelValue(0);
    var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function (event) {
      console.log('Received Ready event: ' + JSON.stringify(event.data));
      castReceiverManager.setApplicationState('Application status is ready...');
    };

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function (event) {
      console.log('Received Sender Connected event: ' + event.data);
      console.log(castReceiverManager.getSender(event.data).userAgent);
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function (event) {
      console.log('Received Sender Disconnected event: ' + event.data);
      if (castReceiverManager.getSenders().length === 0) {
        window.close();
      }
    };

    // handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function (event) {
      console.log('Received System Volume Changed event: ' + event.data.level + ' ' +
        event.data.muted);
    };

    // create a CastMessageBus to handle messages for a custom namespace
    var messageBus = castReceiverManager.getCastMessageBus(
      'urn:x-cast:com.steadfastinnovation.android.projectpapyrus');

    // handler for the CastMessageBus message event
    messageBus.onMessage = function (event) {
      console.log('Message [' + event.senderId + ']: ' + event.data);
      // TODO use message
      // inform all senders on the CastMessageBus of the incoming message event
      // sender message listener will be invoked
      messageBus.send(event.senderId, event.data);
    };

    // initialize the CastReceiverManager with an application status message
    castReceiverManager.start({
      statusText: 'Application is starting'
    });
    console.log('Receiver Manager started');
  });
});
