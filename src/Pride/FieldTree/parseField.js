import Parser from '../Parser';
import Raw from './Raw';

const parseField = (fieldName, content) => {
  if (!content) {
    return {};
  }

  try {
    return Parser.parse(content, { defaultFieldName: fieldName });
  } catch (error) {
    return new Raw(content);
  }
};

export default parseField;
