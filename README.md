
```js
import VNK from 'virtual-numeric-keyboard'

const keyHeight = '69.4444444vw'

VNK.init({
  height: keyHeight
})

this.$nextTick(() => {
  VNK.add(this.$refs['money-input'])
  VNK.on('show', () => {
    this.keyShow = true
  })
  VNK.on('hide', () => {
    this.keyShow = false
  })
})
```
