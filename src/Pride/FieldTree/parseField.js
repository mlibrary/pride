import Parser from '../Parser';
import Raw from './Raw';

const parseField = function (fieldName, content) {
  if (!content) {
    return {};
  } else {
    try {
      //      content = content
      //        .replace(/[“”]/g, '"')
      //        .replace(/ [:&]/g, ' ')
      //        .replace(/[:&] /g, ' ')
      //        .replace(/[:&]$/g, '')
      //        .replace(/^[:&]/g, '')
      //        ;
      return Parser.parse(content, { defaultFieldName: fieldName });
    } catch (e) {
      // console.log(e);
      return new Raw(content);
    }
  }
};

export default parseField;
