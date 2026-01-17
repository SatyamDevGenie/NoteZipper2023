import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import store from "./store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateNote from "./screens/CreateNote/CreateNote";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import MyNotes from "./screens/MyNotes/MyNotes";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SingleNote from "./screens/SingleNote/SingleNote";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header setSearch={(s) => setSearch(s)} />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/mynotes" element={<MyNotes search={search} />} />
              <Route path="/note/:id" element={<SingleNote />} />
              <Route path="/createnote" element={<CreateNote />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
