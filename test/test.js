// vscode 里的 console.group 不能用……真是坑死人

module.exports = function(name) {
  function testLog(desc, value) {
    console.log(`[${name}]`, `[${desc}]`, value)
  }
  testLog.error = async function(desc, exec) {
    try {
      await exec()
      console.error(`[${name}]`, `[${desc}]`, 'failed, expecting an error')
    } catch(err) {
      console.log(`[${name}]`, `[${desc}]`, 'success')
    }
  }
  testLog.success = async function(desc, exec) {
    try {
      await exec()
      console.log(`[${name}]`, `[${desc}]`, 'success')
    } catch(err) {
      console.error(`[${name}]`, `[${desc}]`, 'failed, unexpected error')
      console.log(err)
    }
  }
  return testLog
}
