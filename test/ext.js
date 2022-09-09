const Ctx = require('@ppzp/context')
const { testError, TestLog } = require('./test')

const Storage = require('@ppzp/bd')

exports.activate = async function(ctx) {
  console.log('pppppppppppppppppppppppppp')
  Ctx.set(ctx)
  testNoName()
  testDuplicatedName()

  await testInstance()
  await testExtends()
  console.log('pppppppppppppppppppppppppp')
}

function testNoName() {
  testError(
    'no name',
    () => {
      new Storage()
    }
  )
}
function testDuplicatedName() {
  testError(
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

  testLog.success(
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
  const eextends = require('./extends')

  const testLog = TestLog('extends')

  testLog.error(
    'validate',
    () => {
      eextends.validate({})
    }
  )

  testLog.error(
    'saveAll',
    async () => {
      await eextends.saveAll({})
    }
  )
}
