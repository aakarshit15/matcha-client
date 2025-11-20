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
import { UserContext } from "@/contexts/userAndToken"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function CreatePosting({ ...props }: React.ComponentProps<typeof Card>) {

  const [client, _setClient]: any = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    requirements: []
  });

  useEffect(() => {
    if(!localStorage.getItem("user") || !localStorage.getItem("token") || !client) {
        navigate("/login");
    }
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();

    if(e.target.name !== "requirements") {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    } else {
        const reqs = e.target.value.split(";");
        for(let i=0; i<reqs.length; i++) {
            reqs[i].trim();
        }
        setFormData({
            ...formData,
            [e.target.name]: reqs
        });
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, formData, {
            "headers": {
                'Authorization': `Bearer ${client.token}`,
                'Content-Type': 'application/json'
            }
        });
        navigate("/postings");
    } catch (error) {
        console.error(`Error posting new job: ${error}`);
    }
  }

  useEffect(() => {
    
  }, [formData]);


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-extrabold text-5xl">Create Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Title</FieldLabel>
              <Input id="name" type="text" placeholder="Backend Developer" onChange={(e) => {handleChange(e)}} name="title" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Location</FieldLabel>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                name="location"
                onChange={(e) => {handleChange(e)}}
                required
              />
              {/* <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="resume">Description</FieldLabel>
              <Input id="resume" type="text" name="description" onChange={(e) => {handleChange(e)}} required />
              {/* <FieldDescription>
                Must be smaller than 2MB.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="resume">Requirements</FieldLabel>
              <Input id="resume" type="text" name="requirements" onChange={(e) => {handleChange(e)}} required />
              {/* <FieldDescription>
                Must be smaller than 2MB.
              </FieldDescription> */}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={(e) => {handleSubmit(e)}}>Create Posting</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                {/* <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription> */}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
