import { FormEvent, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = e.currentTarget.todo.value;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: todo, completed: false },
    ]);
  };

  const handleToggle = (id: Todo['id']) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: Todo['id']) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              <span onClick={() => handleToggle(todo.id)}>{todo.text}</span>
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => handleDelete(todo.id)}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
