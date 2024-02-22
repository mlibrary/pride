import Settings from '../Settings';

const log = (source, info, ...message) => {
  if (Settings.obnoxious) {
    console.log(`[Pride: ${source}] ${info}`, ...message);
  }
};

export default log;
