import { useState, useEffect } from 'react';

function Header() {
  return (
    <h1 className='text-5xl text-orange-400 bg-[#272324] text-center p-5'>
      ✈️🫠 Tour Essentials 🏖️🩴
    </h1>
  );
}

function Form({ setItemsList = undefined, itemsList = [] } = {}) {
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  const clearForm = () => {
    setValue('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === '') {
      alert("Item Description can't be empty 🤕");
      return;
    }
    const newItem = {
      id: new Date().toISOString(),
      itemName: value,
      quantity,
      packed: false,
    };

    // update the itemsList don't mutate directly i.e itemsList.push(newItem) ❌
    setItemsList([...itemsList, newItem]);
    clearForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center items-center p-6 bg-[#83B799] space-x-7'
    >
      <h2 className='text-2xl'>🌟 Add your Essential trip items</h2>
      <input
        type='text'
        placeholder='Enter the item...'
        className='bg-gray-200 rounded-md px-10 py-2'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>
      <select
        className=' bg-gray-200 rounded-md px-6 py-2'
        onChange={(event) => setQuantity(+event.target.value)}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
      <button
        type='submit'
        className='px-8 py-2 bg-red-500 rounded-xl  hover:scale-105 hover:bg-orange-600'
      >
        Add
      </button>
    </form>
  );
}

function ItemsList({ setItemsList, itemsList = [] } = {}) {
  const [sortCriteria, setSortCriteria] = useState('1');
  const items = [...itemsList].sort(sortItems);

  function sortItems(item1, item2) {
    if (sortCriteria === '1') {
      if (item1.id > item2.id) return 1;
      else if (item1.id < item2.id) return -1;
      return 0;
    } else if (sortCriteria === '2') {
      if (item1.id < item2.id) return 1;
      else if (item1.id > item2.id) return -1;
      return 0;
    } else if (sortCriteria === '3') {
      return item2.packed - item1.packed;
    }
  }

  function clearList() {
    if (itemsList.length > 0) {
      const yes = confirm('Are you sure you want to delete all the items?');
      if (yes) {
        setItemsList([]);
      }
    }
  }

  return (
    <div className='flex flex-col w-full items-center bg-[#E2CD6D] h-4/5'>
      <div className='flex justify-between items-start flex-wrap content-start '>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <Item {...item} setItemsList={setItemsList} itemsList={itemsList} key={item.id} />
            );
          })
        ) : (
          <h2 className='text-3xl text-center w-full mt-4 text-yellow-700'>
            Your Packing List is Empty... 🐶
          </h2>
        )}
      </div>

      <div className='mt-5 space-x-2 flex'>
        <select
          className='p-3 rounded-2xl bg-black text-orange-400 text-lg text-center'
          onChange={(event) => setSortCriteria(event.target.value)}
        >
          <option value={1}>👴🏻Sort by oldest (Default)</option>
          <option value={2}>👶🏻Sort by newest </option>
          <option value={3}>🔥Sort by packed </option>
        </select>
        <button
          className='p-3 rounded-2xl bg-black text-orange-400 text-lg text-center hover:bg-red-700'
          onClick={clearList}
        >
          🗑️ Delete All
        </button>
      </div>
    </div>
  );
}

function Item({ id, itemName, quantity, packed, setItemsList, itemsList } = {}) {
  let items = [...itemsList];

  const handleDelete = (id) => {
    items = items.filter((item) => {
      return item.id !== id;
    });

    setItemsList(items);
  };

  const handleCheckBox = (id) => {
    items.forEach((item) => {
      if (item.id === id) {
        item.packed = !item.packed; //toggle the values
      }
    });

    setItemsList(items);
  };

  return (
    <div
      className={`flex items-center space-x-2 m-3 p-6 rounded-m ${
        packed ? 'bg-green-400' : 'bg-yellow-200'
      } rounded-lg shadow-xl transition-all delay-75`}
    >
      <input type='checkbox' onChange={() => handleCheckBox(id)} />
      <h2 className='text-lg'>{itemName}</h2>
      <h2 className='text-xs'>({quantity})</h2>
      <span className='cursor-pointer' onClick={() => handleDelete(id)}>
        ❌
      </span>
    </div>
  );
}

function Footer({ itemsList = [] } = {}) {
  const items = [...itemsList];
  const packedCount = items.reduce((count, item) => {
    if (item.packed) count++;
    return count;
  }, 0);

  if (items.length)
    return (
      <div className='bg-[#E86F68] text-white text-center sticky bottom-0 w-full p-4'>
        <h2 className='text-xl'>
          You have packed <span className='text-black text-3xl ml-2 mr-2'>{packedCount} </span> out
          of {items.length} items on your list that is{' '}
          <span className='text-black text-3xl ml-2 mr-2'>
            ({Math.round((packedCount / items.length) * 100)}%)
          </span>
          of your items 👍🏻
        </h2>
      </div>
    );

  return (
    <div className='bg-[#E86F68] text-white text-center fixed bottom-0 w-full p-4'>
      <h2 className='text-xl'>Please Add Items...😁 </h2>
      <span className='text-[16px] text-black'>
        (useState() Hook + Lifting Up the State Concepts Brushed Up)
      </span>
    </div>
  );
}

function App() {
  //use localStorage to retrive the results on refresh!
  const [itemsList, setItemsList] = useState(() => {
    const storedItemsList = localStorage.getItem('itemsList');
    return storedItemsList ? JSON.parse(storedItemsList) : [];
  }); // use callback for useState for performance optimization (called only in the initial render)

  useEffect(() => {
    localStorage.setItem('itemsList', JSON.stringify(itemsList));
  }, [itemsList]); // runs only when there is change in itemList state

  return (
    <div className='bg-slate-400 h-screen font-default max-h-screen antialiased'>
      <Header />
      <Form setItemsList={setItemsList} itemsList={itemsList} />
      <ItemsList setItemsList={setItemsList} itemsList={itemsList} />
      <Footer itemsList={itemsList} />
    </div>
  );
}

export default App;
