/** Функции для валидации данных */

/** Функция проверки email на соответствие требованиям
 * латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
 * обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
 * @email string, проверяемая строка
 * @return boolean, true - нет ошибки, false - есть ошибка
 */
export const email = (email: string): boolean => {
  const validEmailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/
  return validEmailRegex.test(email)
}

/** Функция проверки login на соответствие требованиям
 * от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
 * без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
 * @login string, проверяемая строка
 * @return boolean, true - нет ошибки, false - есть ошибка
 */
export const login = (login: string): boolean => {
  const validLoginRegex = /[A-Za-z0-9\-_]{3,19}$/
  return validLoginRegex.test(login)
}

/** Функция проверки password на соответствие требованиям
 * от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
 * @password string, проверяемая строка
 * @return boolean, true - нет ошибки, false - есть ошибка
 */
export const password = (password: string): boolean => {
  /** (?-.*[A-ZА-Я]) - положительное утверждение предварительного просмотра, проверяющая есть ли в строке хотя бы одна заглавная буква (латиница и кириллица)
   * (?-.*\d) - положительное утверждение предварительного просмотра, проверяющее наличие хотя бы одной цифры
   * .{8,40} - длина строки, . - указывает что может быть любой символ за исключением символа новой строки
   * @password string, проверяемая строка
   * @return boolean, true - нет ошибки, false - есть ошибка
   */
  const validPasswordRegex = /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/
  return validPasswordRegex.test(password)
}

/** Функция проверки first_name, second_name на соответствие требованиям
 * от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
 * без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
 * @name string, проверяемая строка
 * @return boolean, true - нет ошибки, false - есть ошибка
 */
export const name = (name: string): boolean => {
  const validNameRegex = /^[A-ZА-Я][A-Za-zА-Яа-я0-9\-_]{2,19}$/
  return validNameRegex.test(name)
}

/** Функция проверки phone на соответствие требованиям
 * от 10 до 15 символов, состоит из цифр, может начинается с плюса.
 * @phone string, проверяемая строка
 * @return boolean, true - нет ошибки, false - есть ошибка
 */

export const phone = (phone: string): boolean => {
  const validPhoneRegex = /^\+?\d{9,14}$/
  return validPhoneRegex.test(phone)
}
