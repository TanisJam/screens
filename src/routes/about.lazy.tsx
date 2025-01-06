import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-2">
      <h3>Welcome to About!</h3>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <div>Count: {count}</div>
    </div>
  );
}
