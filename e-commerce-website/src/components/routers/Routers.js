import ProductList from "../products/ProductList";
import About from "../layout/About";
import { Route, Routes } from "react-router-dom";
import Home from "../layout/Home";
import ContactUs from "../layout/ContactUs";


const Routers = () => {
  return <div>
    <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/store" element={<ProductList />} />
        <Route path ="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs/> } />
    </Routes>
  </div>;
};
export default Routers;