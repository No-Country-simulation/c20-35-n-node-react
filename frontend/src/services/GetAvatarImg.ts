import axios from "axios";
import { User } from "../models/User";

/*
  Esta funcion se encarga de obtener la imagen del avatar del usuario a traves de su email
  La API que se utiliza es la siguiente: https://avatarapi.com/
*/

export async function getAvatarImg(user: User): Promise<string | null> {
  console.log('Ejecutando getAvatarImg con el usuario:', user);
  try {
    const response = await axios.post(
      'https://avatarapi.com/v2/api.aspx',
      {
        // Estas son las credenciales de la API ya que necesita credenciales para funcionar
        username: 'stevendev', 
        password: '123123$',

        // Aqui se le manda el email del usuario para que la API pueda generar la imagen
        email: user?.email,
      },
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      },
    );

    console.log('Respuesta completa:', response.data);

    if (response.data && response.data.Image) {
      console.log('Imagen del avatar:', response.data.Image);
      return response.data.Image;
    } else {
      console.error('No se recibió la imagen del avatar');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la imagen del avatar:', error);
    return null;
  }
}