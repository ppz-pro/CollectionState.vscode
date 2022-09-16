const TestLog = require('../test')

module.exports = async function() {
  console.debug('[[testing index]]')
  testConstructor()
  await testInstance()
  await testExtends()
}

function testConstructor() {
  const Storage = require('@ppzp/bd')
  const testLog = TestLog('constructor: 2')

  testLog.error(
    'no name',
    () => {
      new Storage()
    }
  )

  testLog.error(
    'duplicated name',
    () => {
      new Storage('same-name')
      new Storage('same-name')
    }
  )
}

async function testInstance() {
  const instance = require('./instance')
  const testLog = TestLog('instance: 3')

  await testLog.success(
    'instance.saveAll()',
    async function() {
      const number = Math.random()
      console.debug('saving', number)
      await instance.saveAll({
        number
      })
      if(number !== instance.getAll().number)
        throw Error('getting different number')
    }
  )
  testLog(
    'instance.getAll()',
    instance.getAll()
  )
  testLog(
    'instance.checkout()',
    instance.checkout()
  )
}

async function testExtends() {
  const eextends = require('./extends')
  const testLog = TestLog('extends: 3')

  testLog.error(
    'validate',
    () => {
      eextends.validate({})
    }
  )

  await testLog.error(
    'saveAll unvalid',
    async () => {
      await eextends.saveAll({})
    }
  )

  await testLog.success(
    'saveAll valid',
    async () => {
      await eextends.saveAll({
        name: 'ppz'
      })
    }
  )
}