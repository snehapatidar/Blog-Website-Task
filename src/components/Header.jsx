import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between m-4 background uppercase rounded-lg p-4" >
      <div className="text-white font-bold">Codes for tomorrow</div>
      <div className="flex gap-2 text-white font-bold ">
        <Link to="/">Home</Link>
      </div>
      <div className=" font-bold text-white">
        <Link to='login'>signup/login</Link>
      </div>
    </div>
  );
}

export default Header;
