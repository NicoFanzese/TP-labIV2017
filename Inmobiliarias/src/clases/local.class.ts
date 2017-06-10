export class Local{
    public id;
    public nombre;
    public direccion;
    public idEncargado;
    public foto1;
    public foto2;
    public foto3;

    constructor(id,nombre, direccion, enc, f1, f2, f3)
    {   
        this.id =id;        
        this.nombre = nombre;
        this.direccion = direccion;
        this.idEncargado = enc;
        this.foto1= f1;
        this.foto2= f2;
        this.foto3= f3;

    }

}