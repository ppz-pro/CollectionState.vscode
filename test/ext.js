const Ctx = require('@ppzp/context')
const TestLog = require('./test')

exports.activate = async function(ctx) {
  Ctx.set(ctx)

  const testLog = TestLog('@ppzp/bd')
  testLog.success(
    '@ppzp/bd',
    async () => {
      await require('./index/test')()
      await require('./collection/test')()
    }
  )
}
