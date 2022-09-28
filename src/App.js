import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filter from "./components/Filter";
import Products from "./components/Products";
import { fetchProducts } from "./features/products/productsSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="App">
      <Filter />
      <Products />
    </div>
  );
}

export default App;
