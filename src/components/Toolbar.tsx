import { BsLockFill, BsFillUnlockFill, BsFillTrashFill } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";

interface Props {
  onBlockUser: (whatToDo: "block" | "unblock" | "delete") => void;
  onAdminOrUser: (whatToDo: "admin" | "user") => void;
}

const Toolbar = ({ onBlockUser, onAdminOrUser }: Props) => {
  return (
    <figure className="d-flex py-2">
      <button
        onClick={() => onBlockUser("block")}
        className="border p-2 text-danger"
      >
        <BsLockFill style={{ fontSize: "30px", cursor: "pointer" }} />
        <span>Block</span>
      </button>
      <button onClick={() => onBlockUser("unblock")} className="p-2 mx-3">
        <BsFillUnlockFill style={{ fontSize: "30px", cursor: "pointer" }} />
      </button>
      <button onClick={() => onBlockUser("delete")} className="p-2">
        <BsFillTrashFill style={{ fontSize: "30px", cursor: "pointer" }} />
      </button>
      <button onClick={() => onAdminOrUser("admin")} className="ms-5">
        <RiAdminLine style={{ fontSize: "30px", cursor: "pointer" }} />
        Give Admin
      </button>
      <button onClick={() => onAdminOrUser("user")} className="ms-2">
        <GrUserAdmin style={{ fontSize: "30px", cursor: "pointer" }} />
        Remove Admin
      </button>
    </figure>
  );
};

export default Toolbar;
