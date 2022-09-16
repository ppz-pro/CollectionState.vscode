const TestLog = require('../test')

module.exports = function() {
  console.debug('[[testing collection]]')
  testConstructor()
}

function testConstructor() {
  const Collection = require('@ppzp/bd/collection')

  const testLog = TestLog('constructor: n')
  testLog.error(
    'no name',
    () => {
      new Collection()
    }
  )
  testLog.error(
    'duplicated name',
    () => {
      new Collection('same-collection-name')
      new Collection('same-collection-name')
    }
  )
}