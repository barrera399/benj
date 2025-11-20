import Image from "next/image";

export default function Introduction() {
  return (
    <div className="z-100 flex flex-row items-center min-h-[50vh] justify-between p-10 mt-30 max-w-[1280px] w-full text-white m-auto">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/cv-profile3.jpg"
          alt="Profile"
          width={300}
          height={300}
          className=" border-2 border-teal-400 p-1 object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white text-[50px] font-bold"> <span className="text-teal-white">Hello,</span> I am <span className="text-teal-400 italic">Joseph.</span> <br /> <span className="text-teal-400 italic">I am </span>  a <span className="text-teal-400 italic"></span> Full Stack Developer</h1>
      </div>
    </div>
  );
}
