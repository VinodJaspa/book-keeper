import React,{useEffect} from "react";
import { ImBooks } from "react-icons/im";
import { MdAccountCircle ,MdHome} from "react-icons/md";
import { Nav } from "./Nav";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = ({ children, tab }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token,"token");
    // Redirect to login if user is not authenticated
   
   useEffect(() => {
      if (!token) {
        navigate("/")
        }
    }, [token])
    
  return (
    <div className="h-screen flex">
      <TooltipProvider delayDuration={0}>
        <Nav
        isCollapsed={false}
          links={[
           
            {
              title: "Books",
              icon: ImBooks,
              href: "/books",
              variant: tab === "books" ? "default" : "ghost",
            },
            {
              title: "Manage Account",
              icon: MdAccountCircle,
              href: "/manage-account",
              variant: tab === "manageAccount" ? "default" : "ghost",
            },
            
          ]}
        />
      </TooltipProvider>
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
};

export { DashboardWrapper };
