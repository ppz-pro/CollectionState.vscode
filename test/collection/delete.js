const Collection = require('@ppzp/bd/collection')

const TestLog = require('../test')
const instance = new Collection('delete')

module.exports = async function() {
  await deleteMany()
  await deleteOne()
}

async function deleteMany() {
  const testLog = TestLog('collection deleteMany: n')

  await testLog.success(
    'delete all',
    async () => {
      await instance.deleteMany(() => true)
      if(instance.getAll().length !== 0)
        throw Error('has data after delete all')
    }
  )
  
  await instance.insertMany([
    { year: 3, name: 'ppz' },
    { year: 2, name: 'ccz' },
    { year: 2, name: 'jj' },
    { year: 2, name: 'yyz' }
  ])

  await testLog.success(
    'delete ppz',
    async () => {
      await instance.deleteMany(item => item.name == 'ppz')
      const remaining = instance.getAll()
      if(remaining.length !== 3)
        throw Error('4 - 1 = 3')
      if(remaining[0].name != 'ccz'
        || remaining[1].name != 'jj'
        || remaining[2].name != 'yyz'
      )
        throw Error('where are children?')
    }
  )

  await testLog.error(
    'no where',
    async () => {
      await instance.deleteMany()
    }
  )
  await testLog.error(
    'invalid where',
    async () => {
      await instance.deleteMany(123)
    }
  )
}

async function deleteOne() {
  const testLog = TestLog('collection deleteOne: n')

  await testLog.success(
    'delete ccz',
    async function() {
      await instance.deleteOne(item => item.name == 'ccz')
      const remaining = instance.getAll()
      if(remaining.length != 2)
        throw Error('3 - 1 = 2')
      if(remaining[0].name != 'jj' || remaining[1].name != 'yyz')
        throw Error('where is jj and yyz')
    }
  )

  await testLog.success(
    'delete jj by id',
    async function() {
      const children = instance.getAll()
      await instance.deleteById(children[0]._id)
      const remaining = instance.getAll()
      if(remaining.length !== 1)
        throw Error('2 - 1 = 1')
      if(remaining[0].name !== 'yyz')
        throw Error('where is yyz')
    }
  )
}