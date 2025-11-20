import Link from 'next/link'
import Image from 'next/image'
import { RiInstagramLine } from 'react-icons/ri'
import { FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'


const Socials = [
  { name: 'Twitter', icon: FaXTwitter },
  { name: 'Linkedin', icon: FaLinkedin },
  { name: 'Instagram', icon: RiInstagramLine },
]

export default function Footer() {


  // Split footerLinks into columns with max 5 items per column

  return (
    <div className="content z-[100] flex flex-col justify-center px-14 gap-24 h-[150px] py-10 border-t border-solid border-[#86868b] !mt-20">
      {/* <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col gap-4">
          {logo && logo.url && (
            <Image
              src={logo.url}
              alt={logo.alt || 'Logo'}
              width={logo.width || 165}
              height={logo.height || 75}
              className="object-contain"
            />
          )}
          <p className="text-[#86868b] font-medium max-w-[380px] leading-5 text-sm whitespace-pre-line">
            {data.description}
          </p>
        </div>
        <div className="flex flex-row gap-8">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col space-y-3">
              {column.map((link) => (
                <Link
                  className="text-sm text-white self-start group"
                  href={link.link || '#'}
                  key={link.id || link.label}
                >
                  <span className="relative inline-block before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-current before:scale-x-0 before:transition-transform before:duration-200 group-hover:before:scale-x-100 group-hover:before:origin-left before:origin-right">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div> */}
      <div className="w-full flex flex-row justify-between z-100">
      <div className="text-white text-base w-full text-center">© Joseph 2025</div>
   
      <div className="flex flex-row gap-7">
          {Socials.map(({ icon: Icon, name }, index) => (
            <Icon key={index} name={name} className="text-white h-6 w-6 cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  )
}
