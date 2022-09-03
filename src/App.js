import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser , setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser , setLoggedInUser]}>
    {/* <p>email : {loggedInUser.email}</p>   */}
      <Router>
      <Header></Header> 
        <Routes>
          <Route exact path='/' element={<Shop />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/review' element={<Review />} />
          <Route path="/manage" element={<PrivateRoute><Manage/></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path="/shipment" element={<PrivateRoute><Shipment /></PrivateRoute>} />
          <Route path='/product/:productKey' element={<ProductDetail />}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
