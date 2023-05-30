const { World } = require('./src/world')

let container = null
let world = null

function main () {
  container = document.createElement('div')
  document.body.style.margin = '0px auto'
  document.body.appendChild(container)
  container.style.width = '100%'
  container.style.height = '100%'

  world = new World(container)
  
  world.render()
}

main ()