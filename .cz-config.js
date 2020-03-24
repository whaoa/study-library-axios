/*
 * @Date: 2020-03-24 12:37:55
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-24 12:49:24
 * @FilePath: \source-code\.cz-config.js
 * @Description: 
 */
"use strict";
// git-cz config
module.exports = {
  types: [
    { value: "✨新增", name: "新增: 添加一个新模块" },
    { value: "🐛完善", name: "更新: 更新或修改文件内容" },
    { value: "💄目录", name: "目录: 修改页面目录结构" },
    { value: "🗑删除", name: "删除: 删除一个已有的模块" },
    { value: "⚡优化", name: "优化: 项目优化相关操作(页面布局,主题样式等)" },
    { value: "🔧工具", name: "工具: 开发工具变动(构建、脚手架工具等)" },
    { value: "⏪回滚", name: "回滚: 代码回退" }
  ],
  scopes: [{ name: "Library" }, { name: "File" }, { name: "Util" }],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "表示此更改的范围:",
    subject: "短说明:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"],
  // limit subject length
  subjectLimit: 100
};
