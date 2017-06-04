export class Producto{
    public id;
    public nombre;
    public direccion;
    public localidad;
    public provincia;
    public pais;    
    public descripcion;
    public foto1;
    public foto2;
    public foto3;
    public moneda;
    public precio;

    constructor(id,nombre, direccion,localidad, provincia, pais, desc, f1, f2, f3, mon, pre)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
        this.pais = pais;
        this.descripcion = desc;
        this.foto1=f1;
        this.foto2=f2;
        this.foto3=f3;
        this.moneda=mon;
        this.precio=pre;
    }
}