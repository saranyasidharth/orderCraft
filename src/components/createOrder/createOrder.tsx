import dayjs from "dayjs";
import type { Order, OrderSchemaType } from "../orderForm/schema";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import OrderForm from "../orderForm/orderForm";

export default function CreateOrder() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (data: OrderSchemaType) => {
    const order: Order = {
      ...data,
      createdAt: dayjs().toISOString(),
    };
    try {
      await axios.post(API_URL, order);
      enqueueSnackbar("Order created successfully", { variant: "success" });
      navigate("/orders");
    } catch (error) {
      enqueueSnackbar("Error in creating Order", { variant: "error" });
      throw error;
    }
  };

  return <OrderForm onSubmit={handleSubmit} />;
}
