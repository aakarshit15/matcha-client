import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Posting } from '@/types/posting'
import { Button } from './ui/button'
import { NavLink } from 'react-router'

const JobPostingCard = (
  props: {
    posting: Posting & {
      _id: string
    }
  }
) => {

  const {_id, title, location, description, requirements} = props.posting

  console.log(props.posting);

  return (
    <Card className='border-primary max-w-md gap-0 bg-transparent shadow-none hover:bg-gray-400 hover:text-white hover:scale-105 min-h-[346px] min-w-[446px]'>
      <CardHeader>
        <CardTitle className='font-extrabold text-3xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-center items-start gap-2'>
        <div className="location">
          <span className="location-label font-bold">Location: </span>
          <span className="location-value">{location}</span>
        </div>
        <div className="description">
          <span className="location-label font-bold">Description: </span>
          <span className="location-value">{description}</span>
        </div>
        <div className="requirements">
          <span className="location-label font-bold">Requirements: </span>
          <div className="flex flex-col justify-center items-start">
            {
              requirements.map((req, index) => {
                return <span className='requirement' key={index}>{req}</span>
              })
            }
          </div>
        </div>
        <NavLink to={`/posting/apply/${_id}`}>
          <Button className='cursor-pointer hover:scale-95'>Apply Now</Button>
        </NavLink>
      </CardContent>
    </Card>
  )
}

export default JobPostingCard
