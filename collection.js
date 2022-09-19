const { v4: UUID } = require('uuid')
const isRealString = require('@ppzp/stupid/real-string')

const Storage = require('./index')

/**
 * MongoDB-Collection-Like Storage
 * @template T
 */
module.exports = class Collection extends Storage {
  /**
   * insert multiple document
   * @param {T[]} docList
   */
  async insertMany(docList) {
    // TODO: return the inserted(with id)
    if(!(docList instanceof Array))
      throw TypeError('docList should be an Array')
    docList.every(this.validateOne)
    for(let doc of docList)
      if(doc._id === undefined)
        doc._id = UUID()
    docList.every(this.checkID)
    
    const all = this.getAll()
    all.push(...docList)
    await this.__saveAllUnique(all)
  }

  /**
   * insert a document
   * @param doc the document to insert
   */
  async insertOne(doc) {
    // TODO: return the inserted(with id)
    await this.insertMany([doc])
  }

  /**
   * delete multiple document
   */
  async deleteMany(where) {
    // TODO: return the deleted
    this.__checkWhere(where)
    const data = this.getAll()
    const remaining = data.filter(item => !where(item))
    await super.saveAll(remaining) // no new data, no unique problem
  }

  async deleteOne(where) {
    // TODO: return the deleted
    this.__checkWhere(where)
    const data = this.getAll()
    const index = data.findIndex(where)
    if(index == -1)
      return
    data.splice(index, 1)
    await super.saveAll(data) // no new data, no unique problem
  }

  /**
   * delete a document by id
   * @param {string} id the id of the deleted document
   */
  async deleteById(id) {
    // TODO: return the deleted
    await this.deleteOne(item => item._id === id)
  }

  /**
   * replace a document.
   * @param doc
   */
  async replaceOne(doc) {
    // TODO: return the replaced
    await this.replaceMany([doc])
  }
  
  async replaceMany(docs) {
    if(!(docs instanceof Array))
      throw TypeError('docs should be an Array')
    
    const data = this.getAll()
    for(let doc of docs) {
      this.validateOne(doc)
      this.checkID(doc)
      const index = data.findIndex(item => item._id === doc._id)
      if(index == -1)
        throw Error('the doc to replace not found, id: ' + doc._id)
      data.splice(index, 1, doc)
    }
    await this.__saveAllUnique(data)
  }

  /**
   * replace one if `document` has an id or insert it
   * @param {T}
   */
  async upsert(document) {
    if(document._id !== undefined)
      await this.replaceOne(document)
    else
      await this.insertOne(document)
  }

  /** TODO
   * update documents
   * @param {function} where
   * @param {function} update - first argument is the updated doc and return the new one
   * @return {T[]} - the updated
   */
  
  /**
   * retrive documents
   * @param {function} where 查询条件函数
   * @return {T[]}
   */
  find(where) {
    this.__checkWhere(where)
    const data = this.getAll()
    return data.filter(where)
  }

  /**
   * 获取某一个符合条件的 document
   * @param {function} where 查询条件
   * @return {T}
   */
  findOne(where) {
    this.__checkWhere(where)
    return this.find(where)[0]
  }

  /**
   * retrive a document by id
   * @param {function} where
   * @return {T}
   */
  findById(id) {
    return this.findOne(item => item._id === id)
  }

  /**
   * check if a document is valid
   * @param doc the document to check
   */
  validateOne(doc) {
    if(typeof doc != 'object')
      throw Error('invalid document: inserting a document which is not an "object"')
  }

  /**
   * check if a document has a valid id
   * @param {T} doc the document to check
   */
  checkID(doc) {
    if(!isRealString(doc._id))
      throw Error('invalid document: invalid id ' + doc._id)
  }

  /**
   * check if a where is valid or not
   * @param where
   */
  __checkWhere(where) {
    if(!(where instanceof Function))
      throw Error('where must be a function')
  }

  getInitData() {
    return []
  }

  async saveAll(data) {
    console.warn("you're using @ppzp/bd/Collection.saveAll which is not recommanded")
    await super.saveAll(data)
  }
  async __saveAllUnique(data) {
    const set = new Set()
    for(let doc of data) {
      if(set.has(doc._id))
        throw Error('duplicated id: ' + doc._id)
      set.add(doc._id)
    }

    await super.saveAll(data)
  }
}
