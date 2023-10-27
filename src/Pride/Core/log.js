import Settings from '../Settings';
import sliceCall from '../Util/sliceCall';

const log = function (source, info) {
  if (Settings.obnoxious) {
    const message = sliceCall(arguments, 2);
    message.unshift('[Pride: ' + source + '] ' + info);

    console.log.apply(console, message);
  }
};

export default log;
