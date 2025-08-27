export const successMessages = {
  SUCCESS_CREATING_ORGANIZATION: 'Organização criada com sucesso',
  SUCCESS_UPDATING_ORGANIZATION: 'Organização atualizada com sucesso',
  SUCCESS_DELETING_ORGANIZATION: 'Organização deletada com sucesso',
  SUCCESS_FETCHING_ALL_ORGANIZATIONS: 'Organizações listadas com sucesso',
  SUCCESS_FETCHING_ORGANIZATION: 'Organização encontrada com sucesso'
}

export const errorMessages = {
  ORGANIZATION_NOT_FOUND: 'Organização não encontrada',
  ORGANIZATIONNAME_DUPLICATED: 'Já existe uma organização com esse nome',
  ORGANIZATIONNAME_INVALID: 'O nome da organização é inválido',

  COMPANY_NAME_REQUIRED: 'O nome da empresa é obrigatório',
  COMPANY_NAME_INVALID: 'O nome da empresa informado é inválido',

  EMAIL_REQUIRED: 'O e-mail é obrigatório',
  EMAIL_INVALID: 'O e-mail informado é inválido',
  EMAIL_IN_USE_ALREADY: 'O e-mail já está em uso',

  CNPJ_REQUIRED: 'O CNPJ é obrigatório',
  CNPJ_INVALID: 'O CNPJ informado é inválido',
  CNPJ_IN_USE_ALREADY: 'O CNPJ já está em uso',

  PHONE_REQUIRED: 'O número de telefone é obrigatório',
  PHONE_INVALID: 'O número de telefone informado é inválido',
  PHONE_IN_USE_ALREADY: 'O telefone já está em uso',

  PASSWORD_REQUIRED: 'A senha é obrigatória',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  PASSWORD_TOO_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caractéres especiais',

  INTERNAL_SERVER_ERROR:
    'Erro interno no servidor. Por favor, tente novamente mais tarde.'
}
