const { v4: UUID } = require('uuid')
const isRealString = require('@ppzp/stupid/real-string')

const Storage = require('./index')

/** MongoDB-Collection-Like Storage  */
module.exports = class Collection extends Storage {
  /**
   * @param {string} name the name of the collection
   * @param {string} pkName the name of primary key
   */
  constructor(name, pkName) {
    super(name)
    if(pkName !== undefined) {
      if(isRealString(pkName))
        this.pkName = pkName
      else
        throw Error("error on constructing ArrayCollection: an ArrayCollection's pkName is a string, but receiving " + pkName)
    }
  }

  validate(data) {
    if(!(data instanceof Array))
      throw Error(`invalid ArrayData: not an Array`)
    // pk unique check
    if(this.pkName) {
      const set = new Set()
      for(let doc of data) {
        const pk = doc[this.pkName]
        if(set.has(pk))
          throw Error('duplicated pk: ' + pk)
        set.add(pk)
      }
    }
  }

  /**
   * check if a `doc` is valid
   * @param doc the document to check
   */
  validateOne(doc) {
    if(this.pkName) {
      if(!isRealString(doc[this.pkName]))
        throw Error('invalid document: invalid primary key ' + doc[this.pkName])
    }
  }

  check(data) {
    this.validate(data)
    for(let doc of data)
      this.validateOne(doc)
  }

  /**
   * insert a document
   * @param doc the document to insert
   */
  insert(doc) {
    if(typeof doc != 'object')
      throw Error('invalid document: inserting a document which is not an "object"')
    if(doc[this.pkName] === undefined)
      doc[this.pkName] = UUID()
    this.validateOne(doc)

    const all = this.checkout()
    all.push(doc)
    this.saveAll(all)
  }

  /**
   * update a document
   * @param {string | function} where
   * @param doc
   */
  async updateOne(where, doc) {
    where = this.__where(where)
    const data = this.checkout()
    const index = data.findIndex(where)
    data.splice(index, 1, doc)
    await this.saveAll(data)
  }

  /**
   * create where-function using primary key
   * @param {string | function}
   * @returns {function}
   */
  __where(where) {
    if(this.pkName && isRealString(where))
      where = item => item[this.pkName] == where
    this.__checkWhere(where)
    return where
  }

  /**
   * check if a where is valid or not
   * @param where
   */
  __checkWhere(where) {
    if(!(where instanceof Function))
      throw Error('where must be a string or function')
  }

  getInitData() {
    return []
  }

  /**
   * 获取符合条件的 document
   * @param {function} where 查询条件函数
   */
  find(where) {
    this.__checkWhere(where)
    const data = this.checkout()
    return data.filter(where)
  }

  /**
   * 获取某一个符合条件的 document
   * @param {string | function} where 查询条件，或 pk，或 filter 函数
   */
  findOne(where) {
    where = this.__where(where)
    return this.find(where)[0]
  }
}
