import { useState } from 'react';

export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>This is Layout Component 3asdffa</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 2)}>Add Count</button>
      </div>
    </div>
  );
}
