module.exports = async function() {
  console.debug('[[testing collection]]')
  await require('./insert')()
}
