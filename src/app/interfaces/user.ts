export interface Users {
    usuarios: Usuario[];
}

export interface Usuario {
    nombre: string;
    password: string;
    email: string;
}