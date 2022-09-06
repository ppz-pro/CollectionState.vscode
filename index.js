const { get: getContext } = require('@ppzp/context')
const isRealString = require('@ppzp/stupid/real-string')

/** access、persist data.
 * like a table in relational database
 * or a collection in mongodb.
 */
module.exports = class BD {
  /**
   * @param {string} name the name of the table/collection
   */
  constructor(name) {
    if(!isRealString(name))
      throw Error('error on constructing BD: a BD needs a string name')
    this.name = name
  }
  
  /**
   * get all data
   * @returns all data
   */
  getAll() {
    const data = getContext().globalState.get(this.name)
    if(data === undefined)
      return this.getInitData()
    else
      return data
  }

  /**
   * check if `data` is valid generally
   * @param data the data to validate
   */
  validate(data) {}

  /**
   * check if `data` is valid
   * @param data the data to validate
   */
  check(data) {
    this.validate(data)
  }

  /**
   * get data, check data, return data
   * @returns the valid data
   */
  checkout() {
    const data = this.getAll()
    this.check(data)
    return data
  }

  /**
   * save data
   * @param data the data to save
   */
  async saveAll(data) {
    this.check(data)
    await getContext().globalState.update(this.name, data)
  }

  /**
   * get initial data
   * @returns initial data
   */
  getInitData() {
    return {}
  }
}
exports.BD = BD
