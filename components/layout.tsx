
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
   <div className="dark container d-flex flex-col justify-content-center align-item-center ">
      {children}
   </div>
  )
}
