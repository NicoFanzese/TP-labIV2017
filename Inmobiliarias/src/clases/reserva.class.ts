export class Reserva{
    public id;
    public idCliente;
    public fecha;
    public idProducto;    
    public tipoProducto;
    public fechaDesde;
    public fechaHasta;    

    constructor(id,idCli, fec, idPro, tipoPro, fecDes, fecHas)
    {   
        this.id = id;
        this.idCliente = idCli;
        this.fecha = fec;
        this.idProducto = idPro;    
        this.tipoProducto = tipoPro;
        this.fechaDesde = fecDes;
        this.fechaHasta = fecHas;                  
    }

}