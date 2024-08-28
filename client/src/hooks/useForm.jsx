import { useState } from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha com um email válido.",
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: "A senha deve conter no minimo 1 letra e ao menos 8 caractéres.",
  },
  passwordDiferente: {
    regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/,
    booliano: true,
    message: "As senhas precisam ser identicas.",
  },
  phone: {
    regex:
      /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
    message: "Digite um número de celular válido",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const validate = (value) => {
    if (type === false) return true;
    if (value.length === 0) {
      setErrorMessage("Este campo deve ser prenchido.");
      return false;
    } else if (
      types[type] &&
      types[type].booliano &&
      !types[type].regex.test(value)
    ) {
      setErrorMessage(types[type].message);
      return false;
    } else if (
      types[type] &&
      types[type].regex &&
      !types[type].regex.test(value)
    ) {
      setErrorMessage(types[type].message);
      return false;
    } else {
      setErrorMessage(null);
      return true;
    }
  };

  const onChange = ({ target }) => {
    if (errorMessage) {
      validate(target.value);
      setErrorMessage(null);
    }
    setValue(target.value);
  };

  return {
    value,
    setValue,
    onChange,
    errorMessage,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
