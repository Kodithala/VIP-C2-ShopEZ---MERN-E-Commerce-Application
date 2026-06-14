export const isEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const requireFields = (body, fields) => {
  const missing = fields.filter((field) => !body[field]);
  if (missing.length) {
    return `${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} required`;
  }
  return null;
};
