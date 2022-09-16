const { get: getContext } = require('@ppzp/context')
const isRealString = require('@ppzp/stupid/real-string')

const uniqueStorageName = new Set()

/**
 * access、persist data.
 * like a table in relational database
 * or a collection in mongodb.
 */
module.exports = class Storage {
  /**
   * @param {string} name the name of the Storage
   */
  constructor(name) {
    if(!isRealString(name))
      throw Error('error on constructing Storage: a Storage needs a string name')
    if(uniqueStorageName.has(name))
      throw Error(`error on constructing Storage: the storage name of ${name} has already exist`)
    uniqueStorageName.add(name)
    
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
   * get initial data
   * @returns initial data
   */
  getInitData() {
    return {}
  }

  /**
   * save data
   * @param data the data to save
   */
  async saveAll(data) {
    await getContext().globalState.update(this.name, data)
  }
}
