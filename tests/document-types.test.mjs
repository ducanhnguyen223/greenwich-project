import assert from 'node:assert/strict';
import { test } from 'node:test';
import { documentTypes, isDocumentType } from '../src/document-types.ts';

test('recognizes the device handover ID and Vietnamese title', () => {
  assert.equal(isDocumentType('device_handover'), true);
  assert.equal(documentTypes.device_handover, 'Biên bản bàn giao thiết bị');
  assert.deepEqual(Object.keys(documentTypes), ['device_handover']);
});

test('does not allow callers to extend the supported catalog', () => {
  assert.throws(() => Object.assign(documentTypes, { unknown: 'Unsupported' }), TypeError);
  assert.equal(isDocumentType('unknown'), false);
});

test('rejects unsupported, inherited, malformed and non-string IDs', () => {
  for (const value of [
    'software_services_agreement', 'unknown', 'constructor', 'toString', '__proto__',
    '', ' device_handover ', 'DEVICE_HANDOVER', null, undefined, 1, {}, [],
  ]) {
    assert.equal(isDocumentType(value), false, `Unexpected ID: ${String(value)}`);
  }
});
