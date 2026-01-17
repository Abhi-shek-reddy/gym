// This file is the MAIN HALL of our application 🏢
// Everyone enters here after main.tsx

import AppRoutes from "./routes";

function App() {
  /*
    App does NOT contain UI.
    App is just a TRAFFIC CONTROLLER 🚦

    It says:
    "I don't care about pages,
     I only care about routing"
  */

  return <AppRoutes />;
}

export default App;
//  main.tsx brings users inside the building
// App.tsx sends them to the correct room (page)