import { BsMailbox2, BsFillPinMapFill } from "react-icons/bs";

type Props = {
  email: string;
  address: string;
};

export default function UserCardDetail({ email, address }: Props) {
  return (
    <div className="text-center">
      <p><BsMailbox2 /> {email}</p>
      <p><BsFillPinMapFill /> {address}</p>
    </div>
  );
}
