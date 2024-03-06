import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => {
        console.log(error);
        alert('Failed to fetch data.');
      });
  }, []);



  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: 'green', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid white' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td style={{ padding: '10px', borderRight: 'none', borderBottom: '1px solid black' }}>{employee.id}</td>
              <td style={{ padding: '10px', borderRight: 'none', borderBottom: '1px solid black' }}>{employee.name}</td>
              <td style={{ padding: '10px', borderRight: 'none', borderBottom: '1px solid black' }}>{employee.email}</td>
              <td style={{ padding: '10px', borderRight: 'none', borderBottom: '1px solid black' }}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='paginator'>
        <button className='pre' onClick={handlePreviousPage}> Previous</button>
        <p className='page'>{currentPage}</p>
        <button className='next' onClick={handleNextPage}> Next</button>
      </div>
    </div>
  );
};

export default App;