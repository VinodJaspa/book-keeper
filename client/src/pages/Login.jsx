import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "@/components/app";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/services/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    setIsLoading(true);
    const loadingToastId = toast.loading("Logging in...");

    try {
      const response = await login(data);
      if (response.data) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.accessToken);
        toast.update(loadingToastId, { render: "Logged in successfully!", type: "success", isLoading: false, autoClose: 5000 });
        navigate("/books");
      } else {
        toast.update(loadingToastId, { render: "Login failed!", type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (error) {
      toast.update(loadingToastId, { render: error.message || "Login failed!", type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <AuthWrapper mode="login">
      <ToastContainer />
      <div className={cn("grid gap-6")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-[20px]">
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email<span className="asterisk">*</span>
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="error">Please enter valid email.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password<span className="asterisk">*</span>
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <p className="error">
                  Please enter password with minimum 8 characters.
                </p>
              )}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={handleRegisterClick}
              disabled={isLoading}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export { Login };
