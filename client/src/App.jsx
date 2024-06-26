import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Register, Login, ManageAccount, Books, BookSections, AddBookForm } from "./pages";
import { useSelector } from "react-redux";
import "./App.css";

function App() {



  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/add-new-book" element={<AddBookForm />} />
        <Route exact path="/books/:id" element={<BookSections />} />
        <Route exact path="/manage-account" element={<ManageAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
