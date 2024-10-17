import { useState, useEffect, createContext } from "react";

import axios from 'axios';
import "./BookmarkProvider.css";

export const BookmarkContext = createContext();

const bookmarkURL = "https://crudcrud.com/api/4c94ff262253419fad593e29beb9137c/bookmarks";

const BookmarkProvider = (props) => {

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(bookmarkURL);
      setBookmarks(response.data);
    } catch (error) {
      setError('Failed to fetch data!!!');
    } finally {
      setLoading(false);
    }
  }

  //Adding bookmark
  const addBookmark = async (bookmark) => {
   try{
    const response= await axios.post(bookmarkURL,bookmark);
    setBookmarks([...bookmarks, response.data])
   }catch(err){
    setError("Failed to add item!!");
   }
  };

  //Removing bookmark from List
  const deleteBookmark = async (id) => {
    try{
      await axios.delete(`${bookmarkURL}/${id}`);
      setBookmarks(bookmarks.filter((item)=>item._id!==id));
    }catch(err){
      setError("Failed to delete item !!")
    }
  };

  const updateBookmark = async (id, updatedBookmark) => {
    try {
      await axios.put(`${bookmarkURL}/${id}`, updatedBookmark);
      setBookmarks(
        bookmarks.map((item) => item._id === id ? { ...item, name: updatedBookmark?.name, url: updatedBookmark?.url } : item ) 
      )
    } catch(err){
      setError("Failed to update item!!")
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  const openModal=(item=null)=>{
    setCurrentItem(item);
    setIsModalOpen(true)
  }

  const closeModal=()=>{
    setCurrentItem(null);
    setIsModalOpen(false);
  }

  const context = {
    bookmarks,
    addBookmark,
    deleteBookmark,
    updateBookmark,
    currentItem,
    openModal,
    closeModal,
    isModalOpen,
    loading,
    error
  };

  return (
    <BookmarkContext.Provider value={context}>
      {props.children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
