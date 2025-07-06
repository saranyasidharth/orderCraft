import { Routes, Route, Navigate } from "react-router";
import Orders from "./components/orders/orders";
import CreateOrder from "./components/createOrder/createOrder";
import EditOrder from "./components/editOrder/editOrder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route path="/orders">
        <Route index element={<Orders />} />
        <Route path="create" element={<CreateOrder />} />
        <Route path=":id/edit" element={<EditOrder />} />
        <Route path="*" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
