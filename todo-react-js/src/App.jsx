import { useState } from 'react';
import TodoItem from './components/TodoItem';
import './styles.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'todo 1', description: 'description for todo 1', checked: false, expanded: false },
    { id: 2, title: 'todo 2', description: 'description for todo 2', checked: false, expanded: false },
  ]);
  const [nextId, setNextId] = useState(3);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: nextId,
        title: trimmedTitle,
        description: trimmedDescription,
        checked: false,
        expanded: false,
      },
    ]);
    setNextId(nextId + 1);
    setTitle('');
    setDescription('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleChecked = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const toggleExpanded = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 避免 Enter 讓表單提交
      addTodo();
    }
  };

  return (
    <main className="app-shell">
      <h1 className="title">todo list</h1>

      <section className="editor-card" aria-label="new todo form">
        <div className="new-todo-row">
          <input
            type="text"
            placeholder="new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={addTodo}>
            add
          </button>
        </div>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      <section className="todo-list-card" aria-label="todo items">
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggleChecked={toggleChecked}
              onToggleExpanded={toggleExpanded}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
