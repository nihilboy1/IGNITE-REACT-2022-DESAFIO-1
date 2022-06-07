import S from './style.module.scss'
import LogoImage from "../../Images/logo.svg"

export function Header() {
  return (
    <header className={S.header}>
        <img src={LogoImage} alt="" />
    </header>
  )
}
