import { NotImplementedExcepetion } from "../../util/excepetions"

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedExcepetion(this._validateRequiredFields(data).name)
  }
  _create(data) {
    throw new NotImplementedExcepetion(this._create.name)
  }
  create(data) {
    const isValid = this._validateRequiredFields(data)
    if (!isValid) throw new Error('Invalid data!')

    return this._create(data)
  }
}
