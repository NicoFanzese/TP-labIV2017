export class Oferta{
    public id;
    public nombre;
    public descripcion;
    public moneda;
    public precio;
    public tipo;
    
    constructor(id,nombre, desc, mon, pre, tipo)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.descripcion = desc;
        this.moneda=mon;
        this.precio=pre;
        this.tipo=tipo;
    }
}