import axios from "axios";
import Swal from "sweetalert2";

const URL = 'http://localhost:8080/api/auth/';

export const apiLogin = async (email, password) => {
    try {
        const response = await axios.post(`${URL}login`, {
            correo: email,
            password,
        });
        const token = response.data.token;
        // Guardar token en el almacenamiento local
        token ? localStorage.setItem("token", token) : null;
        if (response) {
            Swal.fire({
                icon: "success",
                title: "¡ Genial !",
                text: "¡Ha iniciado sesión con exito!",
                confirmButtonText: "Ok",
            });
        }
        return response;
    } catch ({ response: { data: { msg } } }) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `${msg}`,
        });
        return false;
    }
};