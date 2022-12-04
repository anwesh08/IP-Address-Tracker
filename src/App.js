import Main from "./Components/Main";
import Map from "./Components/Map";
import './index.css'
// import 'leaflet/dist/leaflet.css'

function App() {
  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-col">
          <Main />
        </div>
        <div className="h-screen w-screen">
          <Map />
        </div>
      </div>
    </>
  );
}

export default App;
