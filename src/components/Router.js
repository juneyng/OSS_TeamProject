import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecipeList from "./page/RecipeList";
import MyList from "./page/myList";
import Recipe from "./page/Recipe";
import SideMenu from "./Sidemenu";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/recipe-list" />} />
        <Route path="/recipe-list" element={<RecipeList />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </Router>
  );
}
