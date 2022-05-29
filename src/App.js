import {Routes, Route} from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

function App() {
  const Shop = () => {
    return (
      <h2>Shop Component</h2>
    );
  }
  return (
    // <CategoryList />
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path='shop' element={<Shop />}></Route>
      </Route>
    </Routes>
    
  );
}

export default App;
