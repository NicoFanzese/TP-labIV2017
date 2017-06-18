export class Producto{
    public id;
    public nombre;
    public descripcion;
    public direccion;
    public foto1;
    public foto2;
    public foto3;
    public moneda;
    public precio;
    public tipo;
    public vigenciaDesde;
    public vigenciaHasta;
    public lat;
    public lng;
    public dirURL

    constructor(id,nombre, desc, dir, tip, vDesde, vhasta, f1, f2, f3, mon, pre, lat, lng, dirURL)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.descripcion = desc;
        this.direccion = dir;
        this.foto1=f1;
        this.foto2=f2;
        this.foto3=f3;
        this.moneda=mon;
        this.precio=pre;
        this.tipo= tip;
        this.vigenciaDesde = vDesde;
        this.vigenciaHasta = vhasta;
        this.lat = lat;
        this.lng = lng;
        this.dirURL = dirURL;        
    }
}