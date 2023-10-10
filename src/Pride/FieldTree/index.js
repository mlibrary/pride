import Field from './Field.js';
import FieldBoolean from './FieldBoolean.js';
import Literal from './Literal.js';
import parseField from './parseField.js';
import Raw from './Raw.js';
import Special from './Special.js';
import Tag from './Tag.js';
import tokenize from './tokenize.js';
import tokens from './tokens.js';
import ValueBoolean from './ValueBoolean.js';

const FieldTree = {};

Object.defineProperty(FieldTree, 'Field', { value: Field });
Object.defineProperty(FieldTree, 'FieldBoolean', { value: FieldBoolean });
Object.defineProperty(FieldTree, 'Literal', { value: Literal });
Object.defineProperty(FieldTree, 'parseField', { value: parseField });
Object.defineProperty(FieldTree, 'Raw', { value: Raw });
Object.defineProperty(FieldTree, 'Special', { value: Special });
Object.defineProperty(FieldTree, 'Tag', { value: Tag });
Object.defineProperty(FieldTree, 'tokenize', { value: tokenize });
Object.defineProperty(FieldTree, 'tokens', { value: tokens });
Object.defineProperty(FieldTree, 'ValueBoolean', { value: ValueBoolean });

export default FieldTree;
