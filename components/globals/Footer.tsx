import Link from 'next/link'
import Image from 'next/image'
import { RiInstagramLine } from 'react-icons/ri'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'

// Upwork Icon Component
const UpworkIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
)

const Socials = [
  // { name: 'Twitter', icon: FaXTwitter },
  { name: 'Linkedin', icon: FaLinkedin },
  // { name: 'Instagram', icon: RiInstagramLine },
  { name: 'GitHub', icon: FaGithub },
  { name: 'Upwork', icon: UpworkIcon },
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
      <div className="text-white text-base w-full text-center">© Joseph 2024</div>
   
      <div className="flex flex-row gap-7">
          {Socials.map(({ icon: Icon, name }, index) => (
            <Icon key={index} className="text-white h-6 w-6 cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  )
}
