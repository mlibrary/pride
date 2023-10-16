import Settings from '../Settings';
import slice from '../Util/slice';

const log = function(source, info) {
  if (Settings.obnoxious) {
    var message = slice(arguments, 2);
    message.unshift('[Pride: ' + source + '] ' + info);

    console.log.apply(console, message);
  }
};

export default log;
