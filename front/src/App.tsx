import { useForm } from "react-hook-form";
import "./App.css";
import { createCheckoutSession } from "./services";

type FormValues = {
  email: string;
  password: string;
};

const items = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

function App() {
  const defaultValues = {
    email: "benoit.grasset@gmail.com",
    password: "toto",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const handleClickSubmit = (data: FormValues) => {};

  const handleCheckout = () => {
    createCheckoutSession({ items });
  };

  return (
    <div className="app">
      <button onClick={handleCheckout}>Checkout</button>
      <form onSubmit={handleSubmit(handleClickSubmit)} className="form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
