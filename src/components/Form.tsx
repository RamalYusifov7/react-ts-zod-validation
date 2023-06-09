import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../utils/zodSchema";
import { FormData } from "../types/types";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSave = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSave)}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" className="form-input" {...register("username")} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          className="form-input"
          {...register("age", {
            setValueAs: (v) => (v === "" ? 1 : parseInt(v, 10)),
          })}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-input"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-input"
          {...register("commitPassword")}
        />
        {errors.commitPassword && <span>{errors.commitPassword.message}</span>}
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
