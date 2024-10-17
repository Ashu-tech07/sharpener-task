import React,{useState, useContext, useEffect} from 'react'
import Modal from '../ui/Modal'
import { BookmarkContext } from '../store/BookmarkProvider';
import classes from './InputForm.module.css'

const InputForm = () => {
    const [name, setName] = useState("");
    const [url,setUrl]=useState("");

    const { addBookmark, updateBookmark, closeModal, currentItem}=useContext(BookmarkContext)

    useEffect(()=>{
      if(currentItem){
        setName(currentItem.name)
        setUrl(currentItem.url);
      }else{
        setName("");
        setUrl("");
      }
    },[currentItem])

    const handleSubmit=(event)=>{
        event.preventDefault();
        let bookmark={
            name:name,
            url:url,
        }
        if(currentItem){
          updateBookmark(currentItem._id, bookmark);
        }else{
          addBookmark(bookmark);
        }
        closeModal();

    }

  return (
    <Modal hideModal={closeModal}>
        <form className='form'>
          <div className={classes.input}>
            <label htmlFor='name'>Website name: </label>
            <input type='text' id='name' value={name}  onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className={classes.input} >
            <label htmlFor='url'> Website url : </label>
            <input type='text' id='url' value={url} onChange={(e)=> setUrl(e.target.value)} />
            </div>
            <div className={classes.btnGroup}>
            <button onClick={handleSubmit} className={classes.btnGroup}> {currentItem ? "Update":"Add"} </button>
            <button onClick={closeModal} className={classes.btnGroup}> Close</button>
            </div>
        </form>
      
    </Modal>
  )
}

export default InputForm
