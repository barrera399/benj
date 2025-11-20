import Link from "next/link";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    year: "2015",
    milestone:
      "The Ideation and Business Planning started in a mere classroom between four eager individuals . This is where the selling of Go-Bags, an all-in-one kit for survivorship.",
  },
  {
    year: "2016",
    milestone:
      "The business started its humble beginnings in the world of business and registered at the Department of Trade and Industry as SH-CCPM Enterprise, SH stands for “SafeHub” while “CCPM” is an acronym of the surnames of the members, namely: Cruz, Cruz, Presbitero, and Mojica.",
  },
  {
    year: "2017",
    milestone:
      "Sales were Php 389,000.00. Passionate in their desire for change, the business was quick to notice and adopt ",
  },
  {
    year: "2018",
    milestone:
      "Sales were Php 214,000.00. After the separation of the members, Daniel Dominic A. Cruz III solely remained determined to his dedication for business prowess and decided to expand his business expertise in the Food and Beverage sector and gave birth to Café Tomas, a coffee shop dedicated to serve the Thomasian youth.",
  },
  {
    year: "2019",
    milestone:
      "Sales were Php 805,000.00. The enterprise rebranded CCPM as “Customized Corporate Promotional Materials”. This gave the distinction between the two types of products that the enterprise offers. “SH” or SAFEHUB offers emergency go-bags while “CCPM” offers corporate giveaways and promotional materials.",
  },
 
];

const CompanyTimeline = () => {
  return (
    <div className="z-100">
      <div className="w-full max-w-[1400px] min-h-[100vh] m-auto flex flex-col items-center py-14 p-16">
        <h1 className="font-bebas-neue text-5xl">TIMELINE</h1>
        <div className="flex flex-col mt-16">
          {timelineData.map((obj, index) => (
            <div
              key={index}
              className="flex h-[140px] flex-row items-center gap-20"
            >
              <label className="text-5xl text-teal-400 font-bebas-neue">
                {obj.year}
              </label>
              <div
                className={cn(
                  "border-r-solid border-teal-400 relative translate-y-[40px] h-full border-r-[10px]",
                  timelineData.length - 1 === index &&
                    "h-[50px] translate-y-[0px] "
                )}
              >
                <div className="bg-teal-400 rounded-lg  p-[10px] absolute left-[-20px] top-[0px] rotate-45">
                  <div className=" bg-black h-[30px] w-[30px] rounded-lg"></div>
                </div>
              </div>
              <p className="text-white text-sm text-justify">{obj.milestone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTimeline;
