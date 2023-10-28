import Header from './Header';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPage from './EditPage';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <Header title="Blog Everywhere"/>
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='post' element={<NewPost />} />
          <Route path='post/:id' element={<PostPage />} />
          <Route path='edit/:id' element={<EditPage />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  )}
export default App;
