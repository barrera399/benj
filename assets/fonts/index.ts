import localFont from 'next/font/local'

export const poppins = localFont({
  variable: '--font-poppins',
  src: [
    {
      path: './Poppins-Thin.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './Poppins-SemiBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: './Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
})
