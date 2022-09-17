const Collection = require('@ppzp/bd/collection')

const TestLog = require('../test')
const instance = new Collection('replace')

module.exports = async function() {
  await instance.deleteMany(() => true)
  await instance.insertMany([
    { year: 3, name: 'ppz' },
    { year: 2, name: 'ccz' },
    { year: 2, name: 'jj' }
  ])

  const testLog = TestLog('collection replace')

  await testLog.error(
    'replace one argument',
    async () => {
      await instance.replaceOne()
    }
  )
  await testLog.error(
    'replace many argument',
    async () => {
      await instance.replaceMany({ _id: Math.random().toString() })
    }
  )

  await testLog.success(
    'update ppz',
    async () => {
      const all = instance.getAll()
      const ppz = all[0]
      ppz.name = 'ohPPZ'
      await instance.replaceOne(ppz)
      const updated = await instance.getAll()
      if(updated.length !== 3)
        throw Error('no add, no delete')
      if(
        updated[0].name !== 'ohPPZ'
        || updated[0].year !== 3
        || updated[0]._id !== ppz._id
      )
        throw Error('update failed')
    }
  )
  
  await testLog.success(
    'update ppz and ccz',
    async () => {
      const [ppz, ccz] = instance.getAll()
      ppz.year = 3.5
      ccz.year = 2.5
      ccz.name = 'ohCCZ'
      await instance.replaceMany([ccz, ppz])
      const updated = instance.getAll()
      const [newPPZ, newCCZ, newJJ] = updated

      if(updated.length !== 3)
        throw Error('doc num error')
      
      if(
        newPPZ.name !== 'ohPPZ'
        || newPPZ.year !== 3.5
      )
        throw Error('ppz updated failed')
      
      if(
        newCCZ.name != 'ohCCZ'
        || newCCZ.year !== 2.5
      )
        throw Error('ccz updated failed')
      
      if(
        newJJ.name != 'jj'
        || newJJ.year !== 2
      )
        throw Error('jj changed')
    }
  )
}