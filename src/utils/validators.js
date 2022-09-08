export function validateEmptyAndLength3 (value) {
  if (!value) {
    return ['* Campo obrigatório'];
  }

  if (value.length < 3) {
    console.log(value.length);
    return ['* O campo deve ter no mínimo 3 caracteres'];
  }

  return true;
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    console.log('value', value);
    return '* Campo obrigatório';
  }

  const isValid = value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);

  if (!isValid) {
    return '* Email inválido';
  }

  return true;
}
