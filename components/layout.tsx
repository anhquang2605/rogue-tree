import { UserInSession } from "@/types/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "./loading/loading-page/LoadingPage";
import ThemeChangeBtn from "./theme-change-btn/ThemeChangeBtn";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({
  children,
}: RootLayoutProps) {
  const { data: session, status } = useSession();

  const [currentTheme, setCurrentTheme] = useState("dark");
  const handleSetDocumentTheme = (theme: string) => {
    document.documentElement.setAttribute("class", theme);
  }
  useEffect(()=>{
    if(session && session.user){
      const userInSession = session.user as UserInSession;
      if(userInSession.themePrefered){
        setCurrentTheme(userInSession.themePrefered);
      }
    }
  },[])
  useEffect(()=>{
    handleSetDocumentTheme(currentTheme);
  },[currentTheme])
  if(status === "loading") {
    return (
      <LoadingPage />
    )
  }
  return (
   <div className="container h-sreen d-flex flex-col justify-content-center align-item-center ">
      <ThemeChangeBtn currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      {children}
   </div>
  )
}
