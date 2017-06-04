export class Cliente{
    public id;
    public nombre;
    public mail;
    public telefono;
    public direccion;
    public localidad;
    public provincia;
    public pais;    

    constructor(id,nombre, mail, telefono, direccion,localidad, provincia, pais)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
        this.pais = pais;
    }
}