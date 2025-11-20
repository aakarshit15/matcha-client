import JobPostingCard from '@/components/JobPostingCard';
import type { Posting } from '@/types/posting';
import { useEffect, useState } from 'react';
import axios from "axios";

const Postings = () => {

  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchPostings = async () => {
        try {
            const respone = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
            console.log(respone.data);
            setPostings(respone.data);
        } catch (error) {
            console.log(`Error fetching postings: ${error}`);
        }
    }

    fetchPostings();
  }, [postings]);

//   const postings: Posting[] = [
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//     {
//         title: "Backend Developer",
//         location: "Bengaluru, India",
//         description: "We are looking for a Node.js backend developer to build REST APIs and manage databases.",
//         requirements: [
//             "Strong knowledge of Node.js",
//             "Experience with MongoDB",
//             "Understanding of REST APIs",
//             "Familiarity with Git"
//         ]
//     },  
//   ];

  return (
    <div className='flex flex-wrap justify-center items-center gap-5 mt-20'>
      {
        postings.map((posting, index) => {
            return <JobPostingCard key={index} posting={posting} />
        })
      }
    </div>
  )
}

export default Postings
