# Input

自带 XSS 攻击防护。

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| placeholder | 输入框提示文案 | String | - |
| rows | textarea 行数 | String \| Number | 1 |
| type | 输入框类型 input 或 textarea | String | 'input' |
| value/v-model | 绑定值 | String \| Number | - |

## Events

| 参数 | 说明 | 回调参数 |
| - | - | - |
| blur | Input 失去焦点时触发 | (e: Event) |
| focus | Input 获取焦点时触发 | (e: Event) |
| input | Input 值改变时触发 | (value: String \| Number) |
