export class LocalProducto{
    public id;
    public idProducto;
    public idLocal;    

    constructor(id,idPro, idLoc)
    {   
        this.id =id;        
        this.idProducto = idPro;
        this.idLocal = idLoc;        
    }
}