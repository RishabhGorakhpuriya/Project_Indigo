import React from 'react';
import DateSelector from './DateSelector';
import { useGlobalContext } from '../Context/context';

const IconDropdown = () => {
  const { status, setStatus, handleSubmit } = useGlobalContext();
  const statusOption = [
    { id: 1, status: "Cancelled" },
    { id: 2, status: "Delayed" }, // Corrected spelling
    { id: 3, status: "On Time" }
  ];
  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    setStatus(e.target.value);
  }
  return (
    <form>
      <div className='d-flex justify-content-center gap-4 my-5'>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ width: '200px' }}
          value={status}
          onChange={handleChangeStatus} 
        >
          <option value="">Select</option>
          {statusOption.map((data) => (
            <option key={data.id} value={data.status}>
              {data.status}
            </option>
          ))}
        </select>
        <DateSelector />
        <button type="button" onClick={handleSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>

  );
};

export default IconDropdown;
