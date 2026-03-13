import { useState } from 'react'
import { HorseList } from './components/HorseList/HorseList'

function App() {

  return (
    <>
      <section id="center">
        <h1 className='text-center'>Harry's Horses</h1>
        <HorseList />
      </section>
    </>
  )
}

export default App
