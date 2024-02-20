import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness'
import { NotImplementedExcepetion } from '../src/util/excepetions'

describe('#BaseBusiness', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  test('should throw an error when child class does not implement _validateRequiredFields function', () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedExcepetion(concreteClass._validateRequiredFields.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })
  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEED = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new Error('Invalid data!')

    expect(() => concreteClass.create({})).toThrow(validationError)
  })
  test('should throw an error when child class does not implement _create function', () => {
    const VALIDATION_SUCCEED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedExcepetion(concreteClass._create.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })
  test('should _create and _validateRequiredFields on create', () => {
    const VALIDATION_SUCCEED = true
    const CREATE_SUCCEED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
      _create = jest.fn().mockReturnValue(CREATE_SUCCEED)
    }
    const concreteClass = new ConcreteClass()
    const baseClassFn = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name)
    const result = concreteClass.create({})

    expect(result).toBeTruthy()
    expect(baseClassFn).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
  })
})
