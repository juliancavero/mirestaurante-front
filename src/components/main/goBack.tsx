import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../publicImages/backArrow.svg";

export function GoBackButton() {
  let navigate = useNavigate();

  async function handleSubmit() {
    navigate(-1);
  }

  return (
    <button className="btn" onClick={handleSubmit}>
      <BackArrow />
    </button>
  );
}
