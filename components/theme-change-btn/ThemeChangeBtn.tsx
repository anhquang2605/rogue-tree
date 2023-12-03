import styles from './theme-change-btn.module.css';
import { PiMoonFill, PiSunFill } from "react-icons/pi";
export interface ThemeChangeBtnProps {
    setCurrentTheme: (theme: string) => void;
    currentTheme: string;
}

export default function ThemeChangeBtn(props: ThemeChangeBtnProps){
    const { setCurrentTheme, currentTheme } = props;

    return(
        <div className={"btn-group " + styles['theme-change-btn']}>
            <button className={"btn " + styles["light"] + " " + (currentTheme === "light" ? styles["active"] : styles["non-active"]) } onClick={()=>setCurrentTheme('light')}> <PiSunFill/> Light</button>
            <button className={"btn " + styles['dark'] + " " + (currentTheme === "dark" ?  styles["active"] : styles["non-active"]) }  onClick={()=>setCurrentTheme('dark')}> <PiMoonFill/>  Dark</button>
        </div>
    )
}