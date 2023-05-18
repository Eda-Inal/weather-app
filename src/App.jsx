import logo from './logo.svg';
import './App.css';
import  { WeatherProvider } from "./context/WeatherContexts";
import Weather from "./components/Weather";


function App() {
  return (

      <WeatherProvider>
        <Weather>
         
        </Weather>
       

      </WeatherProvider>
   
  );
}

export default App;
