export class Usuario{
    public id;
    public nombre;
    public usuario;
    public password;
    public foto;
    public tipo;    
    public estado;

    constructor(id,nombre, usuario, password, tipo)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.tipo = tipo;

        /*if(usuario != undefined)
        {
            this.usuario = usuario;
        }*/

    }
    /*constructor(id,nombre, usuario, password, tipo)
    {     
        this.id =id;   
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.tipo = tipo;
    }*/
}