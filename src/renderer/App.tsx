import './App.css';
import { useState } from 'react';

function App() {
  const [inputs, setinputs] = useState({});
  const [value, setvalue] = useState(null);
  const [err, seterr] = useState({ value: false });

  const handleSubmit = (events) => {
    const length1 = parseInt(inputs.length1);
    const length2 = parseInt(inputs.length2);
    const quantity1 = parseInt(inputs.quantity1);

    const quantity2 = parseInt(inputs.quantity2);
    seterr({value: false })
    if (length1 <= 0)
      seterr({
        ...err,
        length1: 'Negative or Zero is not allowed',
        value: true,
      });
    else if (length2 <= 0)
      seterr({
        ...err,
        length2: 'Negative or Zero  is not allowed',
        value: true,
      });
    else if (quantity1 <= 0)
      seterr({
        ...err,
        quantity1: 'Negative or Zero  is not allowed',
        value: true,
      });
    else if (quantity2 <= 0)
      seterr({
        ...err,
        quantity2: 'Negative or Zero  is not allowed',
        value: true,
      });
    else if (length1 > 12)
      seterr({
        ...err,
        length1: 'Length can not be greater than 12',
        value: true,
      });
    else if (length2 > 12)
      seterr({
        ...err,
        length1: 'Length can not be greater than 12',
        value: true,
      });
   

    if (!err.value) {
      const array = [
        { q: quantity1, l: length1 },
        { q: quantity2, l: length2 },
      ];

      array.sort(function (a, b) {
        return a.l - b.l;
      });
      Calculate(array);
    }
    events.preventDefault();
  };

  const Calculate = (array = []) => {
   
    const rebar = 12;
    let result = 0;
    let remainder = 0;
    let slice_remainder = 0;

    let slice = rebar / array[0].l;
    result += Math.ceil(array[0].q / slice);
    remainder = rebar - (array[0].q % slice) * array[0].l;

    if (remainder > array[1].l) {
      slice_remainder = Math.floor(remainder / array[1].l);

      array[1].q = array[1].q - slice_remainder;
    }
    slice = rebar / array[1].l;
    result += Math.ceil(array[1].q / slice);
    remainder = rebar - (array[1].q % slice) * array[1].l;

    setvalue(result);
  };
  console.log(err)

  const handleChange = (events) => {
    const { name } = events.target;
    const { value } = events.target;
    const temp = inputs;

    switch (name) {
      case 'length1':
        setinputs({ ...temp, length1: value });
        break;
      case 'length2':
        setinputs({ ...temp, length2: value });
        break;
      case 'quantity1':
        setinputs({ ...temp, quantity1: value });
        break;
      case 'quantity2':
        setinputs({ ...temp, quantity2: value });
        break;
    }
  };

  return (
    <div className="App">
      <h1>Length of Rebar = 12m</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <p>
          Length 1{' '}
          {err?.length1 ? <p style={{ color: 'red' }}>{err.length1}</p> : <></>}
        </p>
        <input
          type="number"
          name="length1"
          placeholder="enter length 1"
          onChange={handleChange}
          required
        />
        <p>
          Quantity 1{' '}
          {err?.quantity1 ? (
            <p style={{ color: 'red' }}>{err.quantity1}</p>
          ) : (
            <></>
          )}
        </p>
        <input
          type="number"
          name="quantity1"
          placeholder="enter Quantity 1 "
          onChange={handleChange}
          required
        />
        <p>
          Length 2{' '}
          {err?.length2 ? <p style={{ color: 'red' }}>{err.length2}</p> : <></>}{' '}
        </p>
        <input
          type="number"
          name="length2"
          placeholder="enter length 2"
          onChange={handleChange}
          required
        />
        <p>
          Quantity 2{' '}
          {err?.quantity2 ? (
            <p style={{ color: 'red' }}>{err.quantity2}</p>
          ) : (
            <></>
          )}
        </p>
        <input
          type="number"
          name="quantity2"
          placeholder="enter Quantity 2"
          onChange={handleChange}
          required
        />

        <input type="submit" value="Calculate" />
      </form>
      {value ? (
        <p>
          the minimum number of rebars needed is ={' '}
          <span style={{ fontWeight: 'bold', fontSize: 25 }}>{value}</span>{' '}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
