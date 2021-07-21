import reqwest from 'reqwest';
import testRequest from './testRequest.test';
import safeCall from '../../src/Pride/Util/safeCall';

/*
 * export default function mockRequestSuccess(requestMethod, result) {
 *   reqwest = function(requestInfo) {
 *     testRequest(requestMethod, requestInfo);
 *     requestInfo.success(safeCall(result) || {});
 *   };
 * }
 */

export default function mockRequestSuccess(requestMethod, result, requestInfo) {
  testRequest(requestMethod, requestInfo);
  requestInfo.error(safeCall(result) || {});
}
