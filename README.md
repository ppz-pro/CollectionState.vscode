# bd.vscode
一个 js 库，简化 vscode 插件开发中，数据持久化操作  
底层使用 vscode.ExtensionContext.globalState  

> 除非你的数据量较小，否则不建议使用此库

## bd?
自古以来，编程界有两大难题，一是搞懂需求，二是给变量起名  
这个库提供一种类似于数据库（DB）的功能  
但称它为 db，实在是太抬举它了，就叫 bd 吧  
