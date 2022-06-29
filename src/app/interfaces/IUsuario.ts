export interface IUsuario {
  idRepartidor?: number;
  rut: string;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido: string;
  nro_documento?: number;
  nacionalidad: string;
  calificaion: string;
  genero: string;
  correo: string;
  passsword: string;
}
