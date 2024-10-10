import ProductList from "../products/ProductList";
import About from "../layout/About";
import { Route, Routes } from "react-router-dom";


const Routers = () => {
  return <div>
    <Routes>
        <Route path ="/" element={<ProductList />} />
        <Route path ="/store" element={<ProductList />} />
        <Route path ="/about" element={<About />} />
    </Routes>
  </div>;
};
export default Routers;