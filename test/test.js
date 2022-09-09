exports.testError = async function testError(desc, exec) {
  try {
    await exec()
    console.error(`[${desc}]`, 'failed')
  } catch(err) {
    console.log(`[${desc}]`, 'success')
  }
}

exports.TestLog = function TestLog(name) {
  function testLog(desc, value) {
    console.log(`[${name}]`, `[${desc}]`, value)
  }
  testLog.error = async function(desc, exec) {
    try {
      await exec()
      console.error(`[${name}]`, `[${desc}]`, 'failed')
    } catch(err) {
      console.log(`[${name}]`, `[${desc}]`, 'success')
    }
  }
  testLog.success = async function(desc, exec) {
    try {
      await exec()
      console.log(`[${name}]`, `[${desc}]`, 'success')
    } catch(err) {
      console.error(`[${name}]`, `[${desc}]`, 'failed')
    }
  }
  return testLog
}
