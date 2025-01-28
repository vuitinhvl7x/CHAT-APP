import { MessageSquare } from "lucide-react";
import React, { useState } from "react";

const LoginPage = () => {
  const [count, setCount] = useState(0);

  // Hàm tăng giá trị của bộ đếm
  const increment = () => {
    setCount(count + 1);
  };

  // Hàm giảm giá trị của bộ đếm
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default LoginPage;
