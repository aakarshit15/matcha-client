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
import type { Posting } from "@/types/posting"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export function ApplyForm({ posting, ...props }: React.ComponentProps<typeof Card> & { posting: Posting }) {

  const params = useParams();

  const {
    title,
    location,
    description,
    requirements
  } : Posting = posting;

  const navigate = useNavigate();
  const [client, _setClient] : any = useContext(UserContext);

useEffect(() => {
    if(!client?.user?.name || !client?.user?.email) {
        navigate("/login");
    }
  }, []);

  const [formData, setFormData] = useState({
    jobId: params.id || "",
    name: `${client?.user?.name}` || "",
    email: `${client?.user?.email}` || "",
    resume: null as File | null
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  }

  const handleFileChange = (e: any) => {
    e.preventDefault();
    console.log("Files: ", e.target.files[0]);
    if (e.target.files) {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    }
  }


  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
        const postReqData = new FormData();
        postReqData.append("jobId", formData.jobId);
        postReqData.append("name", formData.name);
        postReqData.append("email", formData.email);
        if (formData.resume) {
          postReqData.append('resume', formData.resume, formData.resume.name);
        } else {
          console.error("Resume file is missing.");
          return; 
        }
        console.log(postReqData);
        for (let [key, value] of postReqData.entries()) {
          console.log(key, value);
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/applications/apply`, postReqData, {
            headers: {
                "Authorization": `Bearer ${client.token}`,
            }
        });
        console.log(response.data);
        navigate("/postings");
    } catch (error) {
        console.error(`Error Applying: ${error}`);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-extrabold text-5xl">{title}</CardTitle>
        <CardDescription className="font-bold text-3xl">
          {location}
        </CardDescription>
        <CardDescription className="text-xl">
          {description}
        </CardDescription>
        <CardDescription className="flex justify-center items-start flex-col gap-2">
          {
            requirements.map((req, index) => {
                return <span key={index}>{req}</span>
            })
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input disabled id="name" type="text" name="name" value={formData.name} onChange={(e) => {handleChange(e)}} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={(e) => {handleChange(e)}}
                required
                disabled
                value={formData.email}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="resume">Resume</FieldLabel>
              <Input id="resume" type="file" name="resume" onChange={(e) => {handleFileChange(e)}} required />
              <FieldDescription>
                Must be smaller than 2MB.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={(e) => {handleClick(e)}}>Apply</Button>
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
