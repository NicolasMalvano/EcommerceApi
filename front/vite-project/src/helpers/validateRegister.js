export const validateRegister = (values) => {
  const errors = {};

  // ---------- NAME ----------
  if (!values.name.trim()) {
    errors.name = ["Name es requerido"];
  }

  // ---------- EMAIL ----------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    errors.email = ["Email es requerido"];
  } else if (!emailRegex.test(values.email)) {
    errors.email = ["Formato de email inválido"];
  }

  // ---------- BIRTHDATE ----------
  if (!values.birthdate) {
    errors.birthdate = ["Birthdate es requerido"];
  }

  // ---------- DNI ----------
  if (!values.nDni) {
    errors.nDni = ["DNI es requerido"];
  } else if (values.nDni.toString().length < 8) {
    errors.nDni = ["El DNI debe tener un mínimo de 8 caracteres"];
  }

  // ---------- USERNAME ----------
  if (!values.username.trim()) {
    errors.username = ["Username es requerido"];
  }

  // ---------- PASSWORD ----------
  const passwordErrors = [];

  if (!values.password) {
    errors.password = "Password es requerido";
    } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Debe contener al menos una mayúscula";
    } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Debe contener al menos un número";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.password = "Debe contener al menos un caracter especial";
    } else if (values.password.length < 8) {
    errors.password = "Debe contener mínimo 8 caracteres";
  }

  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }

  return errors;
};
