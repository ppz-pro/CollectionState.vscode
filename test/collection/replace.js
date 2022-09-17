const Collection = require('@ppzp/bd/collection')

const TestLog = require('../test')
const instance = new Collection('replace')

module.exports = async function() {
  await instance.deleteMany(() => true)
  await instance.insertMany([
    { year: 3, name: 'ppz' },
    { year: 2, name: 'ccz' }
  ])

  const testLog = TestLog('collection replace')

  await testLog.error(
    'no where',
    async () => {
      await instance.replaceOne(1, { _id: 'error' })
    }
  )

  await testLog.error(
    'no doc',
    async () => {
      await instance.replaceOne(() => true)
    }
  )
  
  await testLog.error(
    'invalid doc 1',
    async () => {
      await instance.replaceOne(() => true, {})
    }
  )

  await testLog.error(
    'invalid doc 2',
    async () => {
      await instance.replaceOne(() => true, 2)
    }
  )

  await testLog.success(
    'replace one',
    async () => {
      const all = instance.getAll()
      const ppz = all[0]
      const newName = "I'm ppz"
      ppz.name = newName
      await instance.replaceOne(item => item.name == 'ppz', ppz)

      const newAll = instance.getAll()
      if(newAll.length != 2)
        throw Error('2 - 0 = 2')
      const newPPZ = newAll[0]
      if(newPPZ._id != ppz._id
        || newPPZ.name != newName
        || newPPZ.year != 3
      )
        throw Error('not ppz')
      const ccz = newAll[1]
      if(ccz.name != 'ccz'
        || ccz.year != 2
        || ccz._id != all[1]._id
      )
        throw Error('ccz changed')
    }
  )
  
  await testLog.success(
    'replace by id',
    async () => {
      const all = instance.getAll()
      const ppz = all[0]
      ppz.name = 'ppz'
      await instance.replaceById(ppz._id, ppz)
      const [newPPZ, ccz, jj] = instance.getAll()
      if(newPPZ.name != 'ppz'
        || newPPZ.year != 3
        || newPPZ._id != ppz._id
      )
        throw Error('replace failed')
      
      if(ccz.name != 'ccz'
        || ccz.year != 2
        || ccz._id != all[1]._id
      )
        throw Error('ccz changed')
      if(jj != undefined)
        throw Error('jj?')
    }
  )
}