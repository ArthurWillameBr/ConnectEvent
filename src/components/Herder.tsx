import Logo from "../../assets/Logo.svg";
import { NavLink } from "./NavLink";

export function Herder() {
  return (
    <div className="flex items-center gap-5">
      <img src={Logo} alt="Logo" />
      <nav className="flex items-center gap-5 py-2">
        <NavLink href='/eventos' >Eventos</NavLink>
        <NavLink href='/participantes' >Participantes</NavLink>
      </nav>
    </div>
  );
}
