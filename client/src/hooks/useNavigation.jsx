import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return { goToHome };
};

export default useNavigation;
