// ================== All Imports
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import DarkVersion  from "./component/Dark/DarkVersion"


function App() {

  // Route Start
  const ARDOX = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/"               element={<DarkVersion/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={ARDOX} />
    </>
  )
}

export default App