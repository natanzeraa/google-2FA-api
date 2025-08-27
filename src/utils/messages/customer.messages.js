export const successMessages = {
  SUCCESS_LOGGING_IN: 'Login realizado com sucesso',
  SUCCESS_CREATING_CUSTOMER: 'Cliente criado com sucesso',
  SUCCESS_UPDATING_CUSTOMER: 'Cliente atualizado com sucesso',
  SUCCESS_DELETING_CUSTOMER: 'Cliente deletado com sucesso',
  SUCCESS_FETCHING_ALL_CUSTOMERS: 'Usuários listados com sucesso',
  SUCCESS_FETCHING_CUSTOMER: 'Cliente encontrado com sucesso'
}

export const errorMessages = {
  // Erros gerais
  CUSTOMER_NOT_FOUND: 'Cliente não encontrado',
  CUSTOMERNAME_DUPLICATED: 'Já existe um cliente com esses dados',
  CUSTOMERNAME_INVALID: 'O nome de cliente é inválido',

  // Validações específicas
  FULLNAME_REQUIRED: 'O nome completo é obrigatório',
  FULLNAME_INVALID: 'O nome completo informado é inválido',

  EMAIL_REQUIRED: 'O e-mail é obrigatório',
  EMAIL_INVALID: 'O e-mail informado é inválido',
  EMAIL_IN_USE_ALREADY: 'O e-mail já está em uso',
  INVALID_CREDENTIALS: 'E-mail ou senha inválidos',

  CPF_REQUIRED: 'O CPF é obrigatório',
  CPF_INVALID: 'O CPF informado é inválido',

  PHONE_REQUIRED: 'O número de telefone é obrigatório',
  PHONE_INVALID: 'O número de telefone informado é inválido',
  PHONE_IN_USE_ALREADY: 'O telefone já está em uso',

  PASSWORD_REQUIRED: 'A senha é obrigatória',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  PASSWORD_TOO_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caractéres especiais',

  CUSTOMERS_REQUIRED: 'Ao menos um cliente deve ser informado',
  CUSTOMERS_INVALID: 'A lista de clientes é inválida',

  MANDATORY_FIELDS: 'E-mail, senha e telefone são obrigatórios',

  INTERNAL_SERVER_ERROR:
    'Erro interno no servidor. Por favor, tente novamente mais tarde.'
}
