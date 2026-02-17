function TodoItem({ todo, onDelete, onToggleChecked, onToggleExpanded }) {
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    onToggleChecked(todo.id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <div className="todo-main" onClick={() => onToggleExpanded(todo.id)}>
        <input
          type="checkbox"
          checked={todo.checked}
          onClick={handleCheckboxClick}
          onChange={() => {}}
        />
        <span className="todo-name">{todo.title}</span>
        <button
          type="button"
          className="delete-btn"
          onClick={handleDeleteClick}
        >
          delete
        </button>
      </div>
      {todo.expanded && (
        <p className="todo-description">
          {todo.description || '(no description)'}
        </p>
      )}
    </li>
  );
}

export default TodoItem;
