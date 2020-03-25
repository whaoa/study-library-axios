# Axios 源码学习

## JavaScript 基本语法

### 数据类型判断

`typeof` 用来判断一下数据类型时是准确的：
- `string`
- `number`
- `boolean`
- `function`
- `undefined`
- `symbol`

判断 `array`, `object`, `null` 时 均返回 `object`, 需要使用 `Object.prototype.toString` 进行判断。

通过 `bind`, `call`, `apply` 中任意一个方法修改 `Object.prototype.toString` 方法的 `this` 指向, 以达到期望效果。

### bind & call & apply

三者最终所实现的效果时相同的, 区别在使用方法及返回数据上

`bind`, `call` 的 第一个参数 是 `this` 的指向, 其余参数当作被调用方法的参数进行传递
`apply` 的 第一个参数 同样是用来修改 `this` 的指向, 第二个参数为一个数组, 用来存放需要传递给被调用函数的参数

`bind` 返回 修改 `this` 指向, 传递参数 后的函数, 需要调用才会执行
`apply`, `call` 均是立即执行被调用函数

### 不熟悉的方法

`URLSearchParams` 构造函数
`ArrayBufferView` ? 什么类型 ?
`Object.prototype.hasOwnProperty` 判断一个对象的属性是否是自有属性，也就是不是从原型链上继承得到的属性
`arr.unshift()` 将元素添加到数组的开头，返回数组新长度（修改原数组）
`arr.shift()` 删除数组中的第一个元素，返回被删除元素的值（修改原数组）
`a in {a:1}` 判断对象是否包含一个属性

