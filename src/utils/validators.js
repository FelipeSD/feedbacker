export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '* Campo obrigatório';
  }

  if (value.length < 3) {
    return '* O campo deve ter no mínimo 3 caracteres';
  }

  return true;
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '* Campo obrigatório';
  }

  const isValid = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i).test(value);

  if (!isValid) {
    return '* Email inválido';
  }

  return true;
}
