import heroImg from "@/assets/hero-img.png";

const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full">
        <div className="tagline w-full lg:w-1/2 lg:h-[500px] flex flex-col justify-center items-center lg:items-start lg:px-30 lg:ps-65 gap-5">
          <div className="maintag font-extrabold mt-10 lg:me-10 text-6xl flex justify-center items-center text-center lg:text-left lg:text-8xl">
            Apply, Match, Hire
          </div>
          <div className="secondary-tag font-light text-2xl flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
            <span>Solution of your Hiring Problem</span>
            <span>Analyze resumes with your JD using Pattern Recognition</span>
            <span>Hire 10x Faster</span>
          </div>
        </div>
        <div className="hero-img w-full lg:w-1/2 h-[500px]">
          <img src={heroImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Home
