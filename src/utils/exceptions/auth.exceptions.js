class AuthException extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = 'AuthException'
    this.status = status
  }
}

// Credenciais inválidas (senha/email)
class InvalidCredentialsException extends AuthException {
  constructor(message = 'Email ou senha inválidos', status = 401) {
    super(message, status)
    this.name = 'InvalidCredentialsException'
  }
}

// Conta não encontrada
class AccountNotFoundException extends AuthException {
  constructor(message = 'Conta não encontrada', status = 404) {
    super(message, status)
    this.name = 'AccountNotFoundException'
  }
}

// Token TOTP ausente ou inválido
class TOTPAuthException extends AuthException {
  constructor(
    message = 'O código de autenticação é obrigatório',
    status = 400
  ) {
    super(message, status)
    this.name = 'TOTPAuthException'
  }
}

// Token TOTP incorreto
class TOTPAuthInvalidException extends AuthException {
  constructor(message = 'O código de autenticação é inválido', status = 401) {
    super(message, status)
    this.name = 'TOTPAuthInvalidException'
  }
}

// Token TOTP expirado
class TOTPAuthExpiredException extends AuthException {
  constructor(message = 'O código de autenticação expirou', status = 401) {
    super(message, status)
    this.name = 'TOTPAuthExpiredException'
  }
}

// Secret não encontrado para a organização
class TOTPSecretNotFoundException extends AuthException {
  constructor(
    message = 'Secret não encontrado para essa organização',
    status = 404
  ) {
    super(message, status)
    this.name = 'TOTPSecretNotFoundException'
  }
}

class OrganizationNotFoundException extends AuthException {
  constructor(
    message = 'Organização não existe',
    status = 404
  ) {
    super(message, status)
    this.name = 'OrganizationNotFoundException'
  }
}

export {
  AccountNotFoundException,
  AuthException,
  InvalidCredentialsException, OrganizationNotFoundException, TOTPAuthException,
  TOTPAuthExpiredException,
  TOTPAuthInvalidException,
  TOTPSecretNotFoundException
}

