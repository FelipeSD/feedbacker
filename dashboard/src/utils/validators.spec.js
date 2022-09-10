import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from './validators';

describe('Validators utils', () => {
  it('should give an error with empty value', () => {
    expect(validateEmptyAndLength3()).toBe('* Campo obrigatório');
  });

  it('should give an error with less than 3 characters', () => {
    expect(validateEmptyAndLength3('12')).toBe('* O campo deve ter no mínimo 3 caracteres');
  });

  it('should return true when input pass a correct parameter', () => {
    expect(validateEmptyAndLength3('123')).toBe(true);
  });

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('* Campo obrigatório');
  });

  it('should give an error with invalid email', () => {
    expect(validateEmptyAndEmail('test')).toBe('* Email inválido');
  });

  it('should return true when input pass a correct parameter', () => {
    expect(validateEmptyAndEmail('email@test.com')).toBe(true);
  });
});
