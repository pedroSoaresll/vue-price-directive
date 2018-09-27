import Vue from 'vue'

const preventCursorPosition = event => {

  let target = event.target
  let value = target.value

  target.value = ''
  setTimeout(() => target.value = value, 1)
}

const eventKeydownPrice = event => {

  // armazeno as variaveis necessárias
  let target = event.target
  let value = target.value

  // limpo o valor do campo para rezetar o cursor
  target.value = ''

  value = '0' + value
    .replace(/\D+/g, '')

  // caso value for 0 ou tecla Delete pressionada\, limpar o campo
  if (!(new Number(value)) || event.key === 'Delete') {
    target.value = ''
    return
  }

  value = `${value.substr(0, value.length-2)}.${value.substr(-2)}`
  
  target.value = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL', 
    minimumFractionDigits: 2
  })
    .format(value)
}

Vue.directive('pmoney', {
  bind (el, binding) {
    console.log('element?: ', el)
    console.log('binding?: ', binding)

    el.addEventListener('keyup', eventKeydownPrice)
    el.addEventListener('mousedown', preventCursorPosition)
  }
})
