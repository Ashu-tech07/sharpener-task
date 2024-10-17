import React, { useContext } from 'react';
import './App.css';
import InputForm from './components/home/InputForm';
import { BookmarkContext } from './components/store/BookmarkProvider';

function App() {
  const { bookmarks, deleteBookmark, isModalOpen, openModal, loading, error} = useContext(BookmarkContext);

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>{error}</h1>

  return (
    <div>
      <div className='header'>
      <h1>Bookmark Page</h1>
      <button onClick={()=>openModal()}>Add Bookmark</button>
      </div>
      {isModalOpen && <InputForm/>}
      
        <ul className='a'>
          {
            bookmarks.map((item)=>{
              return (
              <li key={item._id}>
                <div className='list-item'>
                <span>{item.name}  - </span>
                <a href={item.url} target='_blank'> {item.url} </a>
                
                  <button onClick={()=>deleteBookmark(item._id)}>Delete</button>
                  <button onClick={()=>openModal(item)}>Edit</button>
                
                </div>
              </li>
            )})
          }
        </ul>
    </div>
  );
}

export default App;
