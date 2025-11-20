import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserContext } from "@/contexts/userAndToken";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export function ApplicationsTable({ ...props }) {

  const [applications, setApplications] = useState([]);
  const [client, _setClient]: any = useContext(UserContext);

  useEffect(() => {
    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/applications/job/${props.posting._id}`, {
                "headers": {
                    "Authorization": `Bearer ${client?.token}`,
                    "Content-Type": "application/json"
                }
            });
            setApplications(response.data);
        } catch (error) {
            console.error(`Error fetching applications: ${error}`)
        }
    }

    fetchApplications();
  }, [applications]);

  return (
    <Table { ...props }>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Similarity Score</TableHead>
          <TableHead>Resume Link</TableHead>
          <TableHead>Matched Skilss</TableHead>
          <TableHead className="text-right">Applied At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {/* {
        "id": "691b41a0a0ffed7006c5552e",
        "name": "Aatmaj",
        "email": "aatmajrakshe@gmail.com",
        "similarityScore": 19,
        "matchedSkills": [
            "git"
        ],
        "resumeUrl": "https://res.cloudinary.com/drwppzl65/image/upload/v1763393951/resumes/1763393949615-Aditya_Gupta.pdf",
        "appliedAt": "2025-11-17T15:39:12.428Z"
    } */}
        {applications.map((post: any, index: any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{post.email}</TableCell>
            <TableCell>{post.similarityScore}</TableCell>
            <TableCell>{post.resumeUrl}</TableCell>
            <TableCell>{post.matchedSkills.join(", ")}</TableCell>
            <TableCell className="text-right">{post.appliedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}
