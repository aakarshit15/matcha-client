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
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from "axios"
import { UserContext } from "@/contexts/userAndToken"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const navigate = useNavigate();

  const [client, setClient]: any = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem("user") && localStorage.getItem("token") && client) {
      navigate("/postings");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });  

  const [showPassesAlert, setShowPassesAlert] = useState(false);

  const handleChange = (event: any) => {
    event.preventDefault();
    setFormData({...formData, [event.target.name]: event.target.value});
    console.log(formData);
  }

  useEffect(() => {
    if(
      formData.password !== formData.confirmPassword || 
      (formData.password.length < 8 && formData.password.length !== 0) || 
      (formData.confirmPassword.length < 8 && formData.confirmPassword.length !== 0)
    ) {
      setShowPassesAlert(true);
    } else {
      setShowPassesAlert(false);
    }
  }, [formData]);

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    try {
      if(showPassesAlert) {
        console.log("Cannot Register!!!");
      } else {
        console.log(formData);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.token);
        setClient(response.data);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: ""
        });
        navigate("/postings");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Alert variant="destructive" className={`${showPassesAlert ? "" : "hidden"} my-5`} >
        {/* <Terminal /> */}
        <AlertTitle>Password Error!!!</AlertTitle>
        <AlertDescription>
          Passwords and Confirm Passwords Should Match and Should Be Greater than 8 characters.
        </AlertDescription>
      </Alert>
      <Card {...props}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" name="name" value={formData.name} required onChange={(e) => {handleChange(e)}} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={formData.email}
                  onChange={(e) => {handleChange(e)}}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email
                  with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required name="password" value={formData.password} onChange={(e) => {handleChange(e)}} />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required name="confirmPassword" value={formData.confirmPassword} onChange={(e) => {handleChange(e)}} />
                <FieldDescription>Please confirm your password.</FieldDescription>
              </Field>
              <Select 
                onValueChange={(value) => {
                  setFormData({...formData, role: value});
                }}
                value={formData.role}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
              <FieldGroup>
                <Field>
                  <Button type="submit" onClick={(e) => {handleSubmit(e)}}>Create Account</Button>
                  {/* <Button variant="outline" type="button">
                    Sign up with Google
                  </Button> */}
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to="/login">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
