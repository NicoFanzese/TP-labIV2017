export class Empleado{
    public id;
    public nombre;
    public direccion;
    public localidad;
    public provincia;
    public pais;    
    public idUsuario;  

    constructor(id,nombre, direccion,localidad, provincia, pais, idUsuario)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
        this.pais = pais;
        this.idUsuario = idUsuario;

    }

}