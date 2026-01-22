import { useState, useEffect } from 'react';
import './NameInput.css';

const NameInput = ({ calculatorResult, onSubmit, editingName }) => {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingName) {
      setFullName(editingName.full_name);
    }
  }, [editingName]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return 'Full name is required';
    }
    if (!nameRegex.test(name)) {
      return 'Full name must contain only alphabetic characters and spaces';
    }
    if (name.trim().length < 2) {
      return 'Full name must be at least 2 characters';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateName(fullName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!calculatorResult && !editingName) {
      setError('Please calculate a result first');
      return;
    }

    onSubmit(fullName.trim());
    setFullName('');
    setError('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    
    if (error) {
      const validationError = validateName(value);
      setError(validationError);
    }
  };

  return (
    <div className="name-input-container">
      <form onSubmit={handleSubmit} className="name-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={error ? 'input-error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        
        {calculatorResult !== null && !editingName && (
          <div className="result-display">
            <span className="result-label">Calculator Result:</span>
            <span className="result-value">{calculatorResult}</span>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {editingName ? 'Update Name' : 'Save Name'}
        </button>
      </form>
    </div>
  );
};

export default NameInput;
