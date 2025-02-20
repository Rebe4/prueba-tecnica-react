import React, { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId
  timestamp: number
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros 📚'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos 🎮'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Películas 🎥'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Fotos 📷'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Documentos 📄'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Otros 📦'
  }
]

function App() {

  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''

  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
    <main>
      <aside>
        <h1>Prueba técnica de react</h1>
        <h3>Añadir y eliminar elementos de la lista</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir:
            <input
              type="text"
              required
              name="item"
              placeholder="Libros 📚" />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        {
          items.length === 0 ? (
            <p>No hay elementos en la lista</p>
          ) : (
            <ul> {
              items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.text}
                    <button className="style" onClick={createHandleRemoveItem(item.id)}>
                      Eliminar elemento
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        }

      </section>
    </main>
  )
}

export default App
