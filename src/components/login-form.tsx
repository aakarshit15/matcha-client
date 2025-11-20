import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "@/contexts/userAndToken"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const navigate = useNavigate();

  const [client, setClient]: any = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem("user") && localStorage.getItem("token") && client) {
      navigate("/postings");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });  

  const handleChange = (event: any) => {
    event.preventDefault();
    setFormData({...formData, [event.target.name]: event.target.value});
    console.log(formData);
  }

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      setClient(response.data);
      setFormData({
        email: "",
        password: ""
      });
      navigate("/postings");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  onChange={(e) => {handleChange(e)}}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" name="password" onChange={(e) => {handleChange(e)}} required />
              </Field>
              <Field>
                <Button type="submit" onClick={(e) => {handleSubmit(e)}}>Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
