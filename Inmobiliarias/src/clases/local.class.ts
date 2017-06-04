export class Local{
    public id;
    public nombre;
    public direccion;
    public localidad;
    public provincia;
    public pais;    

    constructor(id,nombre, direccion,localidad, provincia, pais)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
        this.pais = pais;

    }

}