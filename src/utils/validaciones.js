// Valida el nombre para que contenga solo letras y espacios
export const esNombreValido = (nombre) => /^[a-zA-Z\s]+$/.test(nombre);

// Valida el formato de un correo electrónico
export const esCorreoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

// Valida el teléfono para que contenga solo dígitos
export const esTelefonoValido = (telefono) => /^[0-9]+$/.test(telefono);

// Valida que la contraseña tenga al menos 8 caracteres
export const esContrasenaValida = (contrasena) => contrasena.length >= 8;

// Valida el nombre para que esté entre 1 y 50 caracteres
export const esNombreValidoFormulario = (nombre) => nombre.length > 0 && nombre.length <= 50;

// Valida el formato de un correo electrónico
export const esCorreoValidoFormulario = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

// Valida que el teléfono tenga 9 dígitos
export const esTelefonoValidoFormulario = (telefono) => /^\d{9}$/.test(telefono);

// Valida que el mensaje esté entre 1 y 500 caracteres
export const esMensajeValidoFormulario = (mensaje) => mensaje.length > 0 && mensaje.length <= 500;