(function (window) {
  var keyboard = document.querySelector('.vnk-box')
  var keyHeader, keyBody, itemList
  var keyOk
  var events = {}

  if (!keyboard) {
    keyboard = document.createElement('DIV')
    keyboard.classList.add('vnk-box')

    keyHeader = document.createElement('DIV')
    keyHeader.classList.add('vnk-box-header')
    keyOk = document.createElement('span')
    keyOk.innerText = '完成'
    keyOk.classList.add('vnk-key-ok')
    keyHeader.appendChild(keyOk)

    keyBody = document.createElement('DIV')
    keyBody.classList.add('vnk-box-body')

    keyboard.appendChild(keyHeader)
    keyboard.appendChild(keyBody)

    var key
    for (var i = 0; i < 12; i++) {
      key = document.createElement('button')
      key.classList.add('vnk-box-item')
      switch (i) {
        case 9:
          key.classList.add('vnk-box-null')
          key.classList.add('vnk-box-dot')
          key.innerText = '·'
          key.value = '.'
          break
        case 11:
          key.classList.add('vnk-box-null')
          key.value = 'del'
          key.innerHTML = '<svg class="vnk-box-delete-icon" viewBox="0 0 1356 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M90.352941 512 90.352941 512C90.352941 561.808824 466.876386 893.436413 466.876386 893.436413 491.663089 915.595839 539.016734 933.647059 572.343567 933.647059L1144.385777 933.647059C1210.791514 933.647059 1264.941176 879.753165 1264.941176 813.271675L1264.941176 210.728324C1264.941176 144.387622 1210.966679 90.352941 1144.385777 90.352941L572.343567 90.352941C538.797568 90.352941 491.976192 108.195569 467.275565 130.205566 467.275565 130.205566 90.352941 462.191176 90.352941 512L90.352941 512ZM798.117647 448.110824 649.112124 299.105301C631.269707 281.262868 602.796243 281.393566 585.153717 299.036075 567.38822 316.801584 567.542212 345.313738 585.222957 362.99448L734.22848 512 585.222957 661.00552C567.38051 678.847955 567.511221 707.321416 585.153717 724.963924 602.919243 742.729433 631.431379 742.575441 649.112124 724.894699L798.117647 575.889176 947.12317 724.894699C964.965587 742.737131 993.439051 742.606432 1011.081577 724.963924 1028.847074 707.198416 1028.693082 678.686262 1011.012337 661.00552L862.006814 512 1011.012337 362.99448C1028.854784 345.152045 1028.724073 316.678584 1011.081577 299.036075 993.316051 281.270566 964.803915 281.42456 947.12317 299.105301L798.117647 448.110824ZM0 512C0 451.000055 46.04151 400.247371 193.416222 258.98649 201.001352 251.716009 208.764085 244.322514 216.692344 236.815608 258.494554 197.235093 303.171765 156.113154 347.834669 115.79134 363.456512 101.687878 377.967616 88.685541 391.002353 77.08179 398.855288 70.090967 404.49542 65.098401 407.166163 62.748062 448.494622 25.921502 516.73594 0 572.343567 0L1144.385777 0C1260.804698 0 1355.294118 94.424547 1355.294118 210.728324L1355.294118 813.271675C1355.294118 929.643954 1260.702118 1024 1144.385777 1024L572.343567 1024C516.813101 1024 448.017378 997.772113 407.157579 961.239953 404.099885 958.546839 398.465446 953.559407 390.620582 946.575809 377.599337 934.984153 363.103262 921.995303 347.497623 907.90637 302.881009 867.62605 258.250059 826.545577 216.490918 787.003645 208.561333 779.495084 200.797545 772.100048 193.211573 764.82816 46.014283 623.72552 0 572.991482 0 512Z" p-id="1099"/>' +
            '</svg>'
          break
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          key.classList.add('vnk-box-key')
          key.innerText = key.value = '' + (i + 1)
          break
        case 10:
          key.classList.add('vnk-box-key')
          key.innerText = key.value = '0'
          break
      }
      keyBody.appendChild(key)
    }
  } else {
    keyHeader = keyboard.querySelector('.vnk-box-header')
    keyBody = keyboard.querySelector('.vnk-box-body')
    keyOk = keyboard.querySelector('.vnk-key-ok')
  }

  itemList = keyBody.querySelectorAll('.vnk-box-item')

  document.body.appendChild(keyboard)

  var VNK = {
    _keyboard: keyboard,
    _target: null,
    isShow: false,
    height: '69.4444444vw',
    show: function () {
      events['show'].forEach(evt => {
        if (typeof evt === 'function') evt()
      })
      keyboard.classList.add('vnk-box-show')
      VNK.isShow = true
    },
    hide: function () {
      events['hide'].forEach(evt => {
        if (typeof evt === 'function') evt()
      })
      keyboard.classList.remove('vnk-box-show')
      var _target = VNK._target
      setTimeout(function () {
        if (_target) _target.dispatchEvent(new Event('input'))
      }, 1000)

      VNK.isShow = false
      VNK._target = null
    },
    input: function (v) {
      events['input'].forEach(evt => {
        if (typeof evt === 'function') evt(v)
      })
    },
    init: function (opt) {
      VNK.height = keyboard.style.height = opt.height || '69.4444444vw'
    },
    on (type, fn) {
      if (typeof type === 'string' && typeof fn === 'function') {
        if (!events[type]) events[type] = []
        events[type].push(fn)
      } else {
        throw new Error('绑定参数错误')
      }
    },
    off (type, fn) {
      if (typeof type === 'string' && typeof fn === 'function') {
        if (!events[type]) events[type] = []
        var index = events[type].indexOf(fn)
        if (index > -1) events[type].splice(index, 0)
      } else {
        throw new Error('绑定参数错误')
      }
    },
    add: function (dom) {
      if (dom && Object.prototype.toString.call(dom) === '[object HTMLInputElement]') {
        // dom.addEventListener('focus', function () {
        //   document.activeElement.blur()
        //   VNK.show()
        // })

        var parent = dom.parentElement
        var box = document.createElement('DIV')
        var inputStyle = window.getComputedStyle(dom)
        box.className = dom.className
        box.style.width = inputStyle.width
        box.style.height = inputStyle.height
        box.classList.add('vnk-box-input')

        dom.getAttributeNames().forEach(function (attr) {
          if (attr.includes('data-v-')) {
            box.setAttribute(attr, '')
          }
        })

        parent.insertBefore(box, dom)
        dom.style.display = 'none'

        box.addEventListener('touchend', function (evt) {
          if (!VNK.isShow) {
            box.classList.add('focus')
            VNK.show()
            VNK._target = dom
          }

          if (VNK._target === dom) {
            evt.stopPropagation()
            evt.preventDefault()
            return false
          }
        })

        dom.addEventListener('input', function () {
          box.innerText = this.value
        })

        VNK.on('input', function (v) {
          switch (v) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              dom.value += v
              break
            case '.':
              if (!dom.value.toString().includes('.')) dom.value += v
              break
            case 'del':
              dom.value = dom.value.substr(0, dom.value.length - 1)
              break
          }
          dom.dispatchEvent(new Event('input'))
        })
      } else {
        throw new Error('必须传入DOM对象')
      }
    }
  }

  itemList.forEach(function (item) {
    item.addEventListener('touchend', function () {
      VNK.input(this.value)
    })
  })

  keyboard.addEventListener('touchend', function (evt) {
    evt.stopPropagation()
    evt.preventDefault()
    return false
  })

  window.addEventListener('touchend', function () {
    VNK.hide()
  })

  setInterval(function () {
    if (Object.prototype.toString.call(VNK._target) === '[object HTMLInputElement]') {
      VNK._target.dispatchEvent(new Event('input'))
    }
  }, 500)

  keyOk.addEventListener('touchend', function () {
    VNK.hide()
  })

  if (module) {
    module.exports = VNK
  }

  window.VNK = VNK
})(window)
