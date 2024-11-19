import './App.css';
import { BrowserRouter as  Router, Routes, Route  } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import List from './Pages/List';
import AmbulanceList from './Pages/AmbulanceList';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LiveLocation from './Pages/LiveLocation';
import AddAmbulance from './Pages/AddAmbulance';
import AddDrivers from './Pages/AddDrivers';
import Detail from './Pages/Detail';
import EmergencyAlertsPage from './Pages/EmergencyAlertsPage';
import DriverTable from './Pages/DriverTable';
import NotificationsPage from './Pages/Notification';


function App() {
  return (
    <Router>
        <div className="App">
      
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ICU List" element={<List />} />
        <Route path="/Ambulance" element={<AmbulanceList />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/SignupPage' element={<SignupPage />} />
        <Route path='/location' element={<LiveLocation />} />
        <Route path='/AddAmbulance' element={<AddAmbulance />} />
        <Route path='/AddDrivers' element={<AddDrivers />} />
        <Route path="/Detail/:hospitalName" element={<Detail />} />
        <Route path="/emergency-alerts" element={<EmergencyAlertsPage  />} />
        <Route path="/DriverTable" element={<DriverTable />} />
        <Route path="/NotificationsPage" element={<NotificationsPage />} />
         
      </Routes>
    </div>
    </Router>
    
  );
  
}


export default App;
