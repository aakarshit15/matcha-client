import ApplicationCollapsible from '@/components/ApplicationCollapsible'
import { UserContext } from '@/contexts/userAndToken';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Applications = () => {

  const [postings, setPostings] = useState([]);
  const [client, _setClient]: any = useContext(UserContext);

  useEffect(() => {
    const fetchPostings = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
            console.log(response.data);
            const rawPostings = response.data;
            const filtered = rawPostings.filter((posting: any) => {
                return posting.company._id === client.user.id;
            })
            setPostings(filtered);
        } catch (error) {
            console.log(`Error fetching postings: ${error}`);
        }
    }

    fetchPostings();
  }, [postings]); 

  return (
    <>
        <div className="flex flex-col justify-center items-center w-full my-20">
            {
                postings.map((posting, index) => {
                    return <ApplicationCollapsible key={index} posting={posting} /> 
                })
            }
        </div>
    </>
  )
}

export default Applications
