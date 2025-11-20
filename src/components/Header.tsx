import { NavLink, Outlet, useNavigate } from "react-router"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { MenuIcon } from "./ui/icons/il-menu"
import { useContext, useState } from "react"
import { UserContext } from "@/contexts/userAndToken"

const Header = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient]: any = useContext(UserContext);

  const handleLogOut = (e: any) => {
    e.preventDefault();
    setClient();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
        <div className="flex justify-around lg:justify-between items-center mt-10 lg:px-40 max-h-[30px]">
            <NavLink to="/" className="logo cursor-pointer font-extrabold text-2xl lg:text-5xl">
                MATCHA
            </NavLink>
            <div className="nav lg:flex justify-center items-center gap-5 hidden">
                <NavLink to="/create-posting" className={`${client?.user?.role === "company" ? "" : "hidden"}`}>
                    Create Postings
                </NavLink>
                <NavLink to="/postings" className={``}>
                    Job Postings
                </NavLink>
                <NavLink to="/applications" className={`${client?.user?.role === "company" ? "" : "hidden"}`}>
                    Applications
                </NavLink>
                <NavLink to="/login">
                    <Button className={`cursor-pointer ${client ? "hidden" : ""}`}>Login</Button>
                </NavLink>
                <NavLink to="/register" className={`cursor-pointer ${client ? "hidden" : ""}`}>
                    <Button className="cursor-pointer">SignUp</Button>
                </NavLink>
                <Button className={`cursor-pointer ${client ? "" : "hidden"}`} onClick={(e) => {handleLogOut(e)}}>Log Out</Button>
                <ModeToggle />
            </div>
            <div className="flex flex-col justify-center items-center lg:hidden">
                <MenuIcon onClick={() => { setIsOpen(!isOpen) }} className="lg:hidden" />
                <div className={`nav lg:hidden justify-center flex-col items-center gap-5 overflow-clip z-10 bg-gray-950 w-[100px] py-3 ${isOpen ? "flex" : "hidden"}`}>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                    <hr />
                    <NavLink to="/register" className="cursor-pointer">
                        SignUp
                    </NavLink>
                    <hr className="bg-white text-white" />
                    <ModeToggle />
                </div>
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Header
