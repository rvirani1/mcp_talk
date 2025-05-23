import { useState } from 'react'

export default function DeckIsAnApp() {
  const [count, setCount] = useState(0)
  return <div>
    <h1>I'll Let You In On a Secret</h1>
    <p>This whole presentation is a Next.js app</p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
    <p>Count: {count}</p>
  </div>
}
