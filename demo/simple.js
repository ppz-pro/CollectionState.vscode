const CONTEXT = require('@ppzp/context')
const Collection = require('@ppzp/bd/collection')

exports.activate = async function(context) {
  CONTEXT.set(context)

  const userCollection = new Collection('user')
  await userCollection.deleteMany(() => true)

  await userCollection.insertOne({
    name: 'ppz',
    year: 3
  })
  
  const users = userCollection.getAll()
  console.log('all user', str(users))

  const ppz = userCollection.findById(users[0]._id)
  console.log('ppz', str(ppz))

  ppz.name = 'ccz'
  ppz.year = 2
  userCollection.replaceOne(ppz)
  console.log('ccz', str(
    userCollection.findById(ppz._id)
  ))

  await userCollection.deleteById(ppz._id)
  console.log('after delete', str(
    userCollection.getAll()
  ))
}

function str(target) {
  return JSON.stringify(target)
}