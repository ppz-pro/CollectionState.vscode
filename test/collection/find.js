const Collection = require('@ppzp/bd/collection')

const TestLog = require('../test')
const instance = new Collection('find')

module.exports = async function() {
  await instance.deleteMany(() => true)
  const yyzId = '123'
  instance.insertMany([
    { year: 3, name: 'ppz' },
    { year: 2, name: 'ccz' },
    { year: 2, name: 'jj' },
    { _id: yyzId, year: 2, name: 'yyz' }
  ])

  const testLog = TestLog('collection find')

  testLog.success(
    'collectionInstance.find()',
    function() {
      const children = instance.find(() => true)
      if(children.length != 4)
        throw Error('4 children')
      if(children[0].name != 'ppz')
        throw Error('not ppz?')
    }
  )
  
  testLog.success(
    'find ppz',
    function() {
      const children = instance.find(child => child.name == 'ppz')
      if(children.length != 1)
        throw Error('ppz only 1')
      if(children[0].name != 'ppz')
        throw Error('not ppz?')
    }
  )

  testLog.success(
    'find ppz by findOne',
    function() {
      const ppz = instance.findOne(child => child.name == 'ppz')
      if(ppz.name != 'ppz'
      || ppz.year != 3)
        throw Error('not ppz')
    }
  )

  testLog.success(
    'find yyz by id',
    function() {
      const yyz = instance.findById(yyzId)
      if(yyz.name != 'yyz'
      || yyz.year != 2
      || yyz._id != yyzId)
        throw Error('not yyz')
    }
  )
}
