import reqwest from 'reqwest';
import testRequest from './testRequest.test';
import safeCall from '../../src/Pride/Util/safeCall';

export default function mockRequestFailure(requestMethod, result) {
  reqwest = function(requestInfo) {
    testRequest(requestMethod, requestInfo);
    requestInfo.error(safeCall(result) || {});
  };
}
