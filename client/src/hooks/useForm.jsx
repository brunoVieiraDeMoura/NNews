// hooks/useForm.js
import { useState } from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha com um email válido.",
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message:
      "A senha deve conter no mínimo 8 caracteres, incluindo letras e números.",
  },
  passwordDiferente: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: "As senhas precisam ser idênticas.",
  },
  phone: {
    regex:
      /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
    message: "Digite um número de celular válido.",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (value) => {
    if (!type) return true;
    if (value.trim() === "") {
      setError("Este campo é obrigatório.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const onChange = (event) => {
    if (error) validate(event.target.value);
    setValue(event.target.value);
  };

  const onBlur = () => {
    validate(value);
  };

  return {
    value,
    onChange,
    onBlur,
    error,
    helperText: error || "",
    validate: () => validate(value),
    setValue,
  };
};

export default useForm;
