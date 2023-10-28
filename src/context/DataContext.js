import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext();
export default DataContext;

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    const filterResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())//if search為空 空字串包含於任何字串 所以是true
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filterResults.reverse())
  }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch, posts, setPosts, fetchError, isLoading, 
            searchResults,
        }}>
            {children}
        </DataContext.Provider>    
    );
};
