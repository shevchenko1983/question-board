const LIMITS = {
  text: 500,
  note: 2000,
  tag: 40,
};

export function validateQuestion({ text, note = '', tag = '' }) {
  const errors = {};
  const questionText = typeof text === 'string' ? text : '';
  const noteText = typeof note === 'string' ? note : '';
  const tagText = typeof tag === 'string' ? tag : '';

  if (!questionText.trim()) {
    errors.text = 'Question is required.';
  } else if (questionText.length > LIMITS.text) {
    errors.text = `Question must be ${LIMITS.text} characters or fewer.`;
  }

  if (noteText.length > LIMITS.note) {
    errors.note = `Note must be ${LIMITS.note} characters or fewer.`;
  }

  if (tagText.length > LIMITS.tag) {
    errors.tag = `Tag must be ${LIMITS.tag} characters or fewer.`;
  }

  return Object.keys(errors).length === 0 ? null : errors;
}
