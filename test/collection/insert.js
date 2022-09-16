const Collection = require('@ppzp/bd/collection')
const { get: getContext } = require('@ppzp/context')

const TestLog = require('../test')
const instance = new Collection('insert')
getContext().globalState.update('insert', undefined)

module.exports = async function() {
  const testLog = TestLog('collection insert: n')
  
  await (async function() {
    const number = Math.random()
    await testLog.success(
      'insert one',
      async () => {
        await instance.insertOne({ number })
        const all = instance.getAll()
        if(number !== all[all.length -1].number)
          throw Error('error data')
      }
    )
  }())
  
  await (async function() {
    let number = Math.random()
    await testLog.success(
      'multiple insert',
      async () => {
        await instance.insertMany([
          { number },
          { number: number + 1 }
        ])
        const all = instance.getAll()
        const len = all.length
        if(len < 2)
          throw Error('error data on multiple insert, len < 2')
        if(number !== all[len - 2].number
          || number + 1 !== all[len - 1].number)
          throw Error('error data on multiple insert')
      }
    )
  }())

  await testLog.error(
    'error type insert one',
    async () => {
      await instance.insertOne(1)
    }
  )

  await testLog.error(
    'error type insert many',
    async () => {
      await instance.insertMany({})
    }
  )

  await testLog.error(
    'duplicated id',
    async () => {
      const doc = instance.getAll()[0]
      await instance.insertOne(doc)
    }
  )
}
