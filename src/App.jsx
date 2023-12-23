import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// COMPONENTS

import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>,
    ),
  );

  return (
    <div className="bg-[#f5f5f5]">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
