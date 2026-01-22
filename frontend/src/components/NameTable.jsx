import { useState } from 'react';
import './NameTable.css';

const NameTable = ({ names, onUpdate, onDelete, loading }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleEdit = (name) => {
    setEditingId(name.id);
    setEditName(name.full_name);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return 'Full name is required';
    }
    if (!nameRegex.test(name)) {
      return 'Only alphabetic characters allowed';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const handleSaveEdit = async (id) => {
    const validationError = validateName(editName);
    if (validationError) {
      setError(validationError);
      return;
    }

    await onUpdate(id, editName.trim());
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await onDelete(id);
    }
  };

  if (loading) {
    return <div className="loading">Loading names...</div>;
  }

  if (!names || names.length === 0) {
    return <div className="empty-state">No names saved yet. Add one above!</div>;
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="names-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Calculator Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {names.map((name) => (
              <tr key={name.id}>
                <td>
                  {editingId === name.id ? (
                    <div className="edit-cell">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={error ? 'input-error' : ''}
                      />
                      {error && <span className="error-text">{error}</span>}
                    </div>
                  ) : (
                    <span className="name-cell">{name.full_name}</span>
                  )}
                </td>
                <td>
                  <span className="result-badge">{name.calculator_result}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    {editingId === name.id ? (
                      <>
                        <button
                          className="btn-save"
                          onClick={() => handleSaveEdit(name.id)}
                        >
                          ✓
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={handleCancelEdit}
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(name)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(name.id, name.full_name)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NameTable;
