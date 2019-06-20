# Form

## Form

表单组件

### Attribution

| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| model | 表单数据 | object | - |
| rules | 校验规则 | object | - |

## FormItem

表单域组件

### Attribution

| 参数 | 说明 | 类型 | 默认 |
| - | - | - | - |
| label | 表单域标签 | string | - |
| mode | 表单域类型，支持 `vertical` 和 `horizontal` | string | vertical |
| prop | 用于获取 Form 中 model 和 rule 数据，为空则不会进行校验 | string | - |
| showRequired | 是否显示表单域的 `*`，即使校验规则中申明了必填规则也可以不显示 | string | true |

## 自定义组件

自定义组件必须通过 `v-model` 绑定表单数据，并在实践中触发 `form.change` 和 `form.blur` 事件，否则无法触发检验功能。

```js
this.$parent.$emit("form.change");
this.$parent.$emit("form.blur");
```