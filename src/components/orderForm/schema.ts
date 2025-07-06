import * as yup from "yup";

export const orderSchema = yup.object({
  id: yup.string().default(""),
  name: yup.string().required("Name is required").default(""),
  avatar: yup.string().required("Avatar url is required").url("Invalid URL").default(""),
  client: yup.string().required("Client is required").default(""),
  uniqueid: yup.string().required("Unique id is required").default(""),
  product: yup.string().required("Product is required").default(""),
  color: yup.string().required("Color is required").default(""),
  company: yup.string().required("Company is required").default(""),
  showroom: yup.string().required("Showroom is required").default(""),
  country: yup.string().required("Country is required").default(""),
  price1: yup.string().required("Price 1 is required").test("Is-Number", "Invalid Price", (value) => !isNaN(parseFloat(value))).default(""),
  price2: yup.string().required("Price 2  is required").test("Is-Number", "Invalid Price", (value) => !isNaN(parseFloat(value))).default(""),
  loadingDate: yup.string().required("Loading date is required").default(""),
});

export type OrderSchemaType = yup.InferType<typeof orderSchema>;

export type Order = OrderSchemaType & {
  createdAt?: string;
};
