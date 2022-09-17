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
  console.log({ users })

  const ppz = userCollection.findById(users[0]._id)
  console.log({ ppz })

  ppz.name = 'ccz'
  ppz.year = 2
  await userCollection.replaceById(ppz._id, ppz)
  console.log('ccz', userCollection.findById(ppz._id))

  await userCollection.deleteById(ppz._id)
  console.log('after delete', userCollection.getAll())
}