import React, { useState } from "react";
import { DashboardWrapper } from "@/components/app";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/auth";

const ManageAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
const user = useSelector((state) => state.auth.user);
  async function onSubmit(data) {
    let updatedUser ={
      ...user,
       firstName:data.firstName,
      lastName: data.lastName,
    }
    dispatch(setUser(updatedUser))
    setIsLoading(true);
    toast.success("Successfully saved your data!");
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
   // Populate form fields with user data on component mount or user change
   React.useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName); 
      setValue("lastName", user.lastName); 
    }
  }, [user, setValue]);
  return (
    <DashboardWrapper tab="manageAccount">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
        <h2 className="text-xl font-bold">Manage Account</h2>
        <div className={cn("grid gap-6")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-[20px]">
              <div className="grid gap-2">
                <Label className="" htmlFor="firstName">
                  First Name<span className="asterisk">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  alue={user?.firstName}
                  disabled={isLoading}
                  {...register("firstName", { required: true, maxLength: 15 })}
                />
               {errors.lastName && (
                  <p className="error">
                    Please enter first name with maximum 15 characters.
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="lastName">
                  Last Name<span className="asterisk">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  defaultValue={user?.lastName}

                  disabled={isLoading}
                  {...register("lastName", { required: true, maxLength: 15 })}
                />
               
                {errors.firstName && (
                  <p className="error">
                    Please enter last name with maximum 15 characters.
                  </p>
                )}
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export { ManageAccount };
