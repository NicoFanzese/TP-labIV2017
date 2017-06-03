export class Usuario{
    public nombre;
    public usuario;
    public password;
    public foto;
    public tipo;    
    public estado;

    constructor(nombre, usuario, password, tipo)
    {        
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.tipo = tipo;

        /*if(usuario != undefined)
        {
            this.usuario = usuario;
        }*/

    }
}