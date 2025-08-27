export const successMessages = {
  SUCCESS_LOGING_IN: 'Login realizado com sucesso',
  SUCCESS_CREATING_ACCOUNT: 'Conta criada com sucesso',
  SUCCESS_UPDATING_ACCOUNT: 'Conta atualizada com sucesso',
  SUCCESS_DELETING_ACCOUNT: 'Conta deletada com sucesso'
}

export const errorMessages = {
  // Erros gerais
  ACCOUNT_NOT_FOUND: 'Conta não encontrada',
  ACCOUNT_NAME_DUPLICATED: 'Já existe uma conta com esse nome',
  ACCOUNT_NAME_INVALID: 'O nome da conta é inválido',

  // Validações específicas
  COMPANY_NAME_REQUIRED: 'O nome da empresa é obrigatório',
  COMPANY_NAME_INVALID: 'O nome da empresa é inválido',

  EMAIL_REQUIRED: 'O e-mail é obrigatório',
  EMAIL_INVALID: 'O e-mail informado é inválido',
  EMAIL_IN_USE_ALREADY: 'Email já está em uso',
  INVALID_CREDENTIALS: 'Email ou senha inválidos',

  CNPJ_REQUIRED: 'O CNPJ é obrigatório',
  CNPJ_INVALID: 'O CNPJ informado é inválido',

  PHONE_REQUIRED: 'O número de telefone é obrigatório',
  PHONE_INVALID: 'O número de telefone informado é inválido',
  PHONE_IN_USE_ALREADY: 'Telefone já está em uso',

  PASSWORD_REQUIRED: 'A senha é obrigatória',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  PASSWORD_TOO_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',

  USERS_REQUIRED: 'Ao menos um usuário deve ser informado',
  USERS_INVALID: 'A lista de usuários é inválida',

  MANDATORY_FIELDS: 'Email, senha e telefone são obrigatórios'
}
