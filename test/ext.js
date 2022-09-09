const Ctx = require('@ppzp/context')
const { TestLog } = require('./test')

exports.activate = async function(ctx) {
  let hasError
  try {
    console.log('@ppzp/bd test start')
    Ctx.set(ctx)

    testConstructor()
    await testInstance()
    await testExtends()

    console.log('@ppzp/bd test finish')
  } catch(err) {
    hasError = true
    console.error(err)
  }
}

function testConstructor() {
  const Storage = require('@ppzp/bd')
  const testLog = TestLog('constructor')

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
  const instance = require('./index/instance')
  const testLog = TestLog('instance')

  testLog(
    'instance.getAll()',
    instance.getAll()
  )
  testLog(
    'instance.checkout()',
    instance.checkout()
  )

  await testLog.success(
    'instance.saveAll()',
    async () => {
      const number = Math.random()
      await instance.saveAll({
        number
      })
      if(number !== instance.getAll().number)
        throw Error()
    }
  )
}

async function testExtends() {
  const eextends = require('./index/extends')
  const testLog = TestLog('extends')

  testLog.error(
    'validate',
    () => {
      eextends.validate({})
    }
  )

  await testLog.error(
    'saveAll',
    async () => {
      await eextends.saveAll({})
    }
  )
}
