const Ctx = require('@ppzp/context')
const TestLog = require('./test')

exports.activate = async function(ctx) {
  Ctx.set(ctx)

  const testLog = TestLog('@ppzp/bd: 2')
  testLog.success(
    '@ppzp/bd',
    async () => {
      await require('./index/test')()
    }
  )
}
