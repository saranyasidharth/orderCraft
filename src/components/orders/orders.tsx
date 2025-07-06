import { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import DeleteOrder from "../deleteOrder/deleteOrder";
import { API_URL } from "../../utils/constants";
import type { Order } from "../orderForm/schema";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [mutate, setMutate] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Order[]>(API_URL);
        setOrders(data);
      } catch (error) {
        console.error("Error in fetching Order", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mutate]);

  const handleCreate = () => {
    navigate("create");
  };

  const handleEdit = (order: Order) => {
    navigate(`${order.id}/edit`);
  };

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      await axios.delete(`${API_URL}/${deleteTarget.id}`);
      enqueueSnackbar("Order deleted successfully", { variant: "success" });
      setMutate((prev) => !prev);
    } catch (err) {
      enqueueSnackbar("Failed to delete order", { variant: "error" });
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, enqueueSnackbar]);

  const columns: ColDef<Order>[] = [
    {
      headerName: "User",
      field: "name",
      flex: 1,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<Order>) => {
        const order = params.data;
        if (!order) return null;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar
              src={order.avatar}
              alt={order.name}
              sx={{ width: 32, height: 32 }}
            >
              {order.name?.[0] ?? "?"}
            </Avatar>
            <span>{order.name}</span>
          </div>
        );
      },
    },
    { headerName: "Client", field: "client", flex: 1 },
    { headerName: "Unique ID", field: "uniqueid", maxWidth: 100 },
    { headerName: "Product", field: "product", flex: 1 },
    { headerName: "Color", field: "color", maxWidth: 100 },
    { headerName: "Company", field: "company", flex: 1 },
    { headerName: "Showroom", field: "showroom", flex: 1 },
    { headerName: "Country", field: "country", flex: 1 },
    {
      headerName: "Price 1",
      field: "price1",
      type: "numericColumn",
      valueGetter: (params) => parseFloat(params.data?.price1 ?? "0"),
      maxWidth: 120,
    },
    {
      headerName: "Price 2",
      field: "price2",
      type: "numericColumn",
      valueGetter: (params) => parseFloat(params.data?.price2 ?? "0"),
      maxWidth: 120,
    },
    {
      headerName: "Total",
      valueGetter: (params) =>
        (
          parseFloat(params.data?.price1 ?? "0") +
          parseFloat(params.data?.price2 ?? "0")
        ).toFixed(2),
      type: "numericColumn",
      maxWidth: 120,
    },
    {
      headerName: "Loading Date",
      field: "loadingDate",
      flex: 1,
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleString() : "",
    },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleString() : "",
      sort: "desc",
      flex: 1,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams<Order>) => {
        const order = params.data;
        if (!order) return null;

        return (
          <>
            <Button onClick={() => handleEdit(order)}>Edit</Button>
            <Button color="error" onClick={() => setDeleteTarget(order)}>
              Delete
            </Button>
          </>
        );
      },
      minWidth: 180,
    },
  ];

  return (
    <Box p={2}>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create Order
      </Button>

      <div className="ag-theme-alpine">
        <AgGridReact<Order>
          theme={themeMaterial}
          rowData={orders}
          columnDefs={columns}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          loading={isLoading}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          domLayout="autoHeight"
        />
      </div>

      <DeleteOrder
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order?"
      />
    </Box>
  );
}
