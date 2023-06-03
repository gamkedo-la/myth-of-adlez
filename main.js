const { World } = require('./src/world')

let container = null
let world = null

async function main () {
  container = document.createElement('div')
  document.body.style.margin = '0px auto'
  document.body.style.backgroundColor = 'black'
  document.body.appendChild(container)
  container.style.width = '100%'
  container.style.height = '100%'

  world = new World(container)
  await world.init()
  
  world.start()
}

main().catch((error) => {
  console.error(error)
})