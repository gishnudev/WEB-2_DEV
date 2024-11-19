import React from 'react'
import Card from './Card'
export const App = () => {
  const name = 'john'
  const x=10
  const y=20
  const array = ['apple','orange','banana']
  const loggedIn = false
  return (
    <>

    <Card customClasses={'bg-gray-100'}/>
    <br />
    <Card customClasses={'bg-blue-100'}/>
    <br />
    <Card customClasses={'bg-red-100'}/>
    </>
  )
}

export default App