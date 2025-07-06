import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { orderSchema, type OrderSchemaType } from "./schema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import styles from "./orderForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@mui/material/Paper";

type Props = {
  defaultValues?: OrderSchemaType;
  onSubmit: (data: OrderSchemaType) => void;
};

export default function OrderForm({ defaultValues, onSubmit }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OrderSchemaType>({
    defaultValues: {
      ...orderSchema.getDefault(),
      ...defaultValues,
    },
    resolver: yupResolver(orderSchema),
  });

  const navigate = useNavigate();

  const isEdit = !!defaultValues?.id;

  const handleBack = () => navigate("..");
  const handleClear = () => reset();

  const onError = (error: FieldErrors<OrderSchemaType>) => {
    console.error(error);
  };

  const renderField = (
    name: keyof OrderSchemaType,
    label: string,
    type = "text"
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message ?? ""}
          variant="outlined"
          size="medium"
        />
      )}
    />
  );

  return (
    <Paper elevation={2} className={styles.root}>
      <Typography variant="h5" fontWeight={600}>
        {isEdit ? "Edit Order" : "Create Order"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.formInputs}>
          {renderField("name", "Name")}
          {renderField("avatar", "Avatar URL")}
          {renderField("client", "Client")}
          {renderField("uniqueid", "Unique ID")}
          {renderField("product", "Product")}
          {renderField("color", "Color")}
          {renderField("company", "Company")}
          {renderField("showroom", "Showroom")}
          {renderField("country", "Country")}
          {renderField("price1", "Price 1")}
          {renderField("price2", "Price 2")}
          <Controller
            name="loadingDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label="Loading Date"
                value={value ? dayjs(value) : null}
                onChange={(newValue) =>
                  onChange(newValue ? newValue.toISOString() : "")
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.loadingDate,
                    helperText: errors.loadingDate
                      ? "Loading Date is required"
                      : "",
                  },
                }}
              />
            )}
          />
        </div>
        <div className={styles.actions}>
          <Button onClick={handleBack} variant="outlined">
            Back
          </Button>
          {!isEdit && (
            <Button onClick={handleClear} variant="outlined">
              Clear
            </Button>
          )}
          <Button type="submit" variant="contained">
            {isEdit ? "Save Changes" : "Create"}
          </Button>
        </div>
      </form>
    </Paper>
  );
}
