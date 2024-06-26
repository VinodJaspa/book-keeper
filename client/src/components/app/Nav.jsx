import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MdMenu, MdClose, MdLibraryBooks, MdHome, MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slices/auth";

const Nav = ({ links }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "h-full group flex flex-col justify-between py-2 border-r transition-all duration-300",
        isCollapsed ? "w-[50px] py-2" : "w-[250px] py-2"
      )}
    >
      <div className="flex justify-between items-center px-2">
        <Link to="/" className="flex items-center gap-2">
          <MdHome size={24} />
          {!isCollapsed && <span>Eminence Test</span>}
        </Link>
        <Button variant="ghost" size="sm" onClick={toggleCollapse}>
          {isCollapsed ? <MdMenu /> : <MdClose />}
        </Button>
      </div>
      <nav className={cn("flex flex-col gap-1 px-2", isCollapsed && "items-center")}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "flex items-center justify-start",
              isCollapsed && "justify-center"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {!isCollapsed && link.title}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-center px-2">
        <Button variant="ghost" onClick={logoutUser} className="flex items-center">
          <MdExitToApp className="mr-2" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export { Nav };
