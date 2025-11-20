import { ApplyForm } from '@/components/ApplyForm';
import { UserContext } from '@/contexts/userAndToken';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'

const Apply = () => {
  
  const params = useParams();
  const id = params.id;
  const [client, _setClient]: any = useContext(UserContext);
  const navigate = useNavigate();
  const [posting, setPosting] = useState({
    title: "",
    location: "",
    description: "",
    requirements: []
  });

  useEffect(() => {
    if(client?.user?.role !== "user") {
        navigate("/login");
    } else {
        const fetchPosting = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
                setPosting(response.data);
            } catch (error) {
                console.error(`Error applying: ${error}`);
            }
        }
        fetchPosting();
    }
  }, []);
//   const {
//     title,
//     location,
//     description,
//     requirements
//   } : Posting = props.posting;

  return (
    <div className='flex justify-center items-center w-full my-20'>
      <ApplyForm posting={posting} className='w-1/2' />
    </div>
  )
}

export default Apply
