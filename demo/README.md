# @ppzp/bd DEMO
[点击查看入口文件：extension.js](./extension.js)

``` js
const CONTEXT = require('@ppzp/context')
const userModel = require('./model/user')

// demo: 用户管理
exports.activate = async function(context) {
  // !!! 首先，设置 context 对象
  // 在使用 @ppzp/bd 的任何函数之前，设置 context 对象
  CONTEXT.set(context)

  // 清空老数据（请忽略这一步）
  await userModel.deleteMany(() => true)

  // 新增用户（异步）
  await userModel.insertOne({
    name: 'ppz',
    year: 3
  })

  // 新增多个用户（异步）
  await userModel.insertMany([
    { name: 'ccz', year: 2 },
    { name: 'jj', year: 2 },
    { name: 'yyz', year: 2 }
  ])

  // 获取所有用户（同步）
  const users = userModel.getAll()
  // console.log('获取所有用户', JSON.stringify(users))

  // 获取一个用户（同步）
  const ppz = userModel.findOne(item => item.name == 'ppz')
  // console.log('获取 ppz', JSON.stringify(ppz))

  // 通过 id 获取用户（同步）
  const ppzById = userModel.findById(ppz._id)
  // console.log('再获取 ppz', JSON.stringify(ppzById))

  // 获取符合条件的用户（同步）
  const children = userModel.find(item => item.year == 3)
  // console.log('三岁的孩', JSON.stringify(children))

  // 更新一个用户（异步）
  ppz.name = 'ohPPZ'
  ppz.year = 3.5
  ppz.tel = '110'
  await userModel.replaceOne(ppz)
  // console.log('改后的 ppz', JSON.stringify(userModel.findById(ppz._id)))

  // 更新多个用户（异步）
  const uuu = userModel.getAll()
  const ccz = uuu[1]
  const jj = uuu[2]
  ccz.name = 'ohCCZ'
  jj.name = 'ohJJ'
  await userModel.replaceMany([ccz, jj])
  // console.log('改后的 children', JSON.stringify(userModel.getAll()))

  // 删除一个用户（异步）
  await userModel.deleteOne(item => item.name == 'ohPPZ')
  // console.log('删除 ppz 之后', JSON.stringify(userModel.getAll()))

  // 根据 id 删除一个用户（异步）
  await userModel.deleteById(ccz._id)
  // console.log('删除 ccz 之后', JSON.stringify(userModel.getAll()))

  // 删除符合条件的所有用户
  await userModel.deleteMany(item => item.year == 2)
  // console.log('没孩了', JSON.stringify(userModel.getAll()))
}
```