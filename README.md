# @ppzp/bd
一个 js 库，简化 vscode 插件开发中的数据持久化操作  
底层使用 vscode.ExtensionContext.globalState  

> 如果你的数据量较大，应使用 MySQL、MongoDB 之类的正经数据库

## 原则
+ 宁简陋，不繁琐。简单，所以健壮

## 使用简介
> 下面的案例仅展示 @ppzp/bd 的大概用法，具体细节请参考[这个 demo](./demo)

### 安装
``` bash
npm install @ppzp/context @ppzp/bd
```

> @ppzp/bd 依赖于 [@ppzp/context](https://github.com/ppz-pro/context.vscode)，用来设置 `vscode.ExtensionContext` 对象

### Collection
```Collection``` 是 @ppzp/bd 的存储单位之一，类似于 MongoDB 里的 Collection 或 MySQL 里的 table  

创建 user collection
``` js
const Collection = require('@ppzp/bd/collection')
const userCollection = new Collection('user')
```

### 新增数据
创建用户：
``` js
userCollection.insertOne({
  name: 'ppz',
  year: 3
})
```

### 查找数据
获取用户，返回一个数组：
``` js
userCollection.getAll()
```

### 查找数据
按 id 获取用户，返回一个用户：
``` js
userCollection.findById(userId)
```

### 更新数据
更新用户，整体替换，非局部更新：
``` js
const user = userCollection.findById(userId)
user.name = 'ccz'
user.year = 2
userCollection.replaceOne(user)
```

### 删除数据
删除用户：
``` js
userCollection.deleteById(userId)
```

## bd?
自古以来，编程界有两大难题，一是搞懂需求，二是给变量起名  
这个库提供一种类似于数据库（DB）的功能  
但称它为 db，实在是太抬举它了，就叫 bd 吧  
