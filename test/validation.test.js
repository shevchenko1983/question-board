import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuestion } from '../src/validation.js';

test('accepts ordinary question text and optional note and tag within limits', () => {
  assert.equal(
    validateQuestion({ text: 'How does this work?', note: 'A short note', tag: 'JavaScript' }),
    null,
  );
});

test('accepts values exactly at each maximum length', () => {
  assert.equal(
    validateQuestion({ text: 'q'.repeat(500), note: 'n'.repeat(2000), tag: 't'.repeat(40) }),
    null,
  );
});

test('rejects an empty question', () => {
  assert.deepEqual(validateQuestion({ text: '', note: '', tag: '' }), {
    text: 'Question is required.',
  });
});

test('rejects a question made only of whitespace', () => {
  assert.deepEqual(validateQuestion({ text: '  \n\t ', note: '', tag: '' }), {
    text: 'Question is required.',
  });
});

test('rejects a question longer than 500 characters', () => {
  assert.deepEqual(validateQuestion({ text: 'q'.repeat(501), note: '', tag: '' }), {
    text: 'Question must be 500 characters or fewer.',
  });
});

test('rejects a note longer than 2000 characters', () => {
  assert.deepEqual(validateQuestion({ text: 'Question', note: 'n'.repeat(2001), tag: '' }), {
    note: 'Note must be 2000 characters or fewer.',
  });
});

test('rejects a tag longer than 40 characters', () => {
  assert.deepEqual(validateQuestion({ text: 'Question', note: '', tag: 't'.repeat(41) }), {
    tag: 'Tag must be 40 characters or fewer.',
  });
});

test('reports all invalid fields together', () => {
  assert.deepEqual(validateQuestion({ text: '', note: 'n'.repeat(2001), tag: 't'.repeat(41) }), {
    text: 'Question is required.',
    note: 'Note must be 2000 characters or fewer.',
    tag: 'Tag must be 40 characters or fewer.',
  });
});
