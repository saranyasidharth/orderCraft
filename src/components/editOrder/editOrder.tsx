import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { type Order, type OrderSchemaType } from "../orderForm/schema";
import OrderForm from "../orderForm/orderForm";
import { useSnackbar } from "notistack";
import Loader from "../../common/loader/loader";

export default function EditOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Error in fetching Order", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const defaultValues: OrderSchemaType | undefined = order
    ? {
        id: order.id,
        name: order.name,
        avatar: order.avatar,
        client: order.client,
        uniqueid: order.uniqueid,
        product: order.product,
        color: order.color,
        company: order.company,
        showroom: order.showroom,
        country: order.country,
        price1: order.price1,
        price2: order.price2,
        loadingDate: order.loadingDate,
      }
    : undefined;

  const handleSubmit = async (data: OrderSchemaType) => {
    try {
      await axios.put(`${API_URL}/${data.id}`, data);
      enqueueSnackbar("Order edited successfully", { variant: "success" });
      navigate("/orders");
    } catch (error) {
      enqueueSnackbar("Error in editing Order", { variant: "error" });
      throw error;
    }
  };
  return isLoading ? (
    <Loader />
  ) : !order ? (
    <div>Order not found</div>
  ) : (
    <OrderForm onSubmit={handleSubmit} defaultValues={defaultValues} />
  );
}
