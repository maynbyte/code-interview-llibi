import { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import NameInput from './components/NameInput';
import NameTable from './components/NameTable';
import { nameService } from './services/api';
import './App.css';

function App() {
  const [calculatorResult, setCalculatorResult] = useState(null);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      setLoading(true);
      const response = await nameService.getAllNames();
      if (response.success) {
        setNames(response.data);
      }
    } catch (err) {
      setError('Failed to load names. Please check if the backend server is running.');
      console.error('Error fetching names:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (result) => {
    setCalculatorResult(result);
  };

  const handleSubmitName = async (fullName) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await nameService.createName({
        full_name: fullName,
        calculator_result: calculatorResult,
      });

      if (response.success) {
        setSuccess('Name saved successfully!');
        setCalculatorResult(null);
        await fetchNames();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to save name');
      console.error('Error saving name:', err);
    }
  };

  const handleUpdateName = async (id, fullName) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await nameService.updateName(id, {
        full_name: fullName,
      });

      if (response.success) {
        setSuccess('Name updated successfully!');
        await fetchNames();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update name');
      console.error('Error updating name:', err);
    }
  };

  const handleDeleteName = async (id) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await nameService.deleteName(id);

      if (response.success) {
        setSuccess('Name deleted successfully!');
        await fetchNames();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete name');
      console.error('Error deleting name:', err);
    }
  };

  return (
    <div className="app">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <main className="app-content">
        <div className="input-section">
          <NameInput
            calculatorResult={calculatorResult}
            onSubmit={handleSubmitName}
          />
        </div>

        <div className="calculator-section">
          <Calculator onCalculate={handleCalculate} />
        </div>

        <div className="table-section">
          <NameTable
            names={names}
            onUpdate={handleUpdateName}
            onDelete={handleDeleteName}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
