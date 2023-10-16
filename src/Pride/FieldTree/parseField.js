import Parser from '../Parser';
import Raw from './Raw';

const parseField = function(field_name, content) {
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
      return Parser.parse(content, {defaultFieldName: field_name});
    }
    catch (e) {
      console.log(e);
      return new Raw(content);
    }
  }
};

export default parseField;
