export class Cliente{
    public id;
    public nombre;
    public mail;
    public telefono;
    public direccion;
    public idUsuario;

    constructor(id,nombre, mail, telefono, direccion,usu)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
        this.direccion = direccion;
        this.idUsuario = usu;
    }
}