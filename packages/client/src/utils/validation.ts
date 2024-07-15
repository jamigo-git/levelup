/** Функции для валидации данных */
import { Rule } from 'antd/es/form'

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

const nameRegexValidationMessage = `должно начинаться с заглавной буквы,
                                    может содержать цифры, но не состоять из них, 
                                    без пробелов, без спецсимволов 
                                    (допустимы дефис и нижнее подчёркивание)`

/** Валидации для поля Имя */
export const firstNameRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите имя!',
  },
  {
    min: 3,
    message: 'Имя должно быть не менее 3 символов в длину!',
  },
  {
    max: 20,
    message: 'Имя должно быть не более 20 символов в длину!',
  },
  () => ({
    validator(_, value) {
      if (name(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Имя ${nameRegexValidationMessage}`))
    },
  }),
]

/** Валидации для поля Фамилия */
export const secondNameRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите Фамилию!',
  },
  {
    min: 3,
    message: 'Фамилия должна быть не менее 3 символов в длину!',
  },
  {
    max: 20,
    message: 'Фамилия должна быть не более 20 символов в длину!',
  },
  () => ({
    validator(_, value) {
      if (name(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Фамилия ${nameRegexValidationMessage}`))
    },
  }),
]

const emailRegexValidationError = `латиница, может включать цифры и спецсимволы 
                                    вроде дефиса и подчёркивания, 
                                    обязательно должна быть «собака» (@) 
                                    и точка после неё, но перед точкой 
                                    обязательно должны быть буквы`

/** Валидации для поля Email */
export const emailRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите Email!',
  },
  () => ({
    validator(_, value) {
      if (email(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(emailRegexValidationError))
    },
  }),
]

/** Валидации для поля Телефон */
export const phoneRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите телефон!',
  },
  {
    min: 3,
    message: 'Телефон должен быть не менее 10 символов в длину!',
  },
  {
    max: 20,
    message: 'Телефон должен быть не более 15 символов в длину!',
  },
  () => ({
    validator(_, value) {
      if (phone(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Состоит из цифр, может начинается с плюса`))
    },
  }),
]

const loginRegexValidationMessage = `Логин должен быть набран латиницей, 
                                      может содержать цифры, но не состоять из них,
                                      без пробелов, без спецсимволов 
                                      (допустимы дефис и нижнее подчёркивание)`

/** Валидации для поля логин */
export const loginRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите логин!',
  },
  {
    min: 3,
    message: 'Логин должен быть не менее 3 символов в длину!',
  },
  {
    max: 20,
    message: 'Логин должен быть не более 20 символов в длину!',
  },
  () => ({
    validator(_, value) {
      if (login(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(loginRegexValidationMessage))
    },
  }),
]

/** Валидации для поля пароль */
export const passwordRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите пароль!',
  },
  {
    min: 8,
    message: 'Пароль должен быть не менее 8 символов в длину!',
  },
  {
    max: 40,
    message: 'Пароль должен быть не более 40 символов в длину!',
  },
  () => ({
    validator(_, value) {
      if (password(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Обязательно хотя бы одна заглавная буква и цифра`))
    },
  }),
]
