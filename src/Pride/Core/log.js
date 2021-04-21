import Settings from '../Settings';
import slice from '../Util/slice';

export default function log(source, info) {
  if (Settings.obnoxious) {
    const message = slice(arguments, 2);
    message.unshift(`[Pride: ${source}] ${info}`);

    console.log.apply(console, message);
  }
}
