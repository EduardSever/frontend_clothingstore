import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Clothing } from 'src/app/model/clothing';
import { ClothingsService } from 'src/app/services/clothings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clothings',
  templateUrl: './clothings.component.html',
  styleUrls: ['./clothings.component.css']
})
export class ClothingsComponent implements OnInit {

  submitted: boolean;

  lbl_men: string = "Se_elimina_";
  lbl_are_you: string = "Are_you_sure_"
  lbl_clothing_delete: string = "clothing_delete_"
  lbl_confirm: string = "confirm_"
  lbl_mensaje: string = "No existe precio"


  modalReference: NgbModalRef;
  page = 1;
  pageSize = 6;
  collectionSize = 0;
  /**
   * Lista de clothings a mostrar en pantalla.
   */
  public clothings: Clothing[];
  /**
   * Objeto de un clothing a guardar o actualizar.
   */
  public clothing: Clothing;
  /**
   * constructor de default que inicializa el componente de clothings. 
   * @param clothingsService 
   */
  constructor(private clothingsService: ClothingsService,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.consultarClothings();
    this.clothing = new Clothing();
  }
  /**
   * funcion para consultar clothings
   */
  consultarClothings() {
    console.log('Consultando clothings')
    this.clothingsService.cunsultarClothings().subscribe(response => {
      console.log(response);
      this.clothings = response;
      //this.collectionSize = this.clothings.length;

      this.clothings = this.clothings
        .map((clothing, i) => ({ counter: i + 1, ...clothing }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize,);
    });
  }
  /**
   * Métdodo que permite habrir una ventana modal a través del componente.
   * @param content 
   */
  open(content: any) {

    this.submitted = false;
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  /**
   * Método que permite precargar el objeto de clothing a mostrarse en la ventana modal para actualizarse.
   * @param clothingSelected clothing o objeto selecionado por el usuario.
   */
  loadClothing(clothingSelected: Clothing, content: any) {
    this.submitted = false;
    this.clothing = new Clothing();
    this.clothing.id = clothingSelected.id;
    this.clothing.garment_name = clothingSelected.garment_name;
    this.clothing.color = clothingSelected.color;
    this.clothing.size = clothingSelected.size;
    this.clothing.year = clothingSelected.year;
    this.clothing.price = clothingSelected.price;
    this.clothing.brand = clothingSelected.brand;
    this.clothing.type = clothingSelected.type;

    this.open(content);
  }
  /**
   * Método que permite guardar una clothing.
   * @param data información de los campos capurados en el formulario.
   */
  saveClothing(data: any) {
    this.submitted = true;
    if (!this.clothing.garment_name.trim()) {
      //if (this.clothing.garment_name) {
      this.clothing = new Clothing();
      // this.clothing.id=data.id;
      this.clothing.garment_name = data.garment_name;
      this.clothing.color = data.color;
      this.clothing.size = data.size;
      this.clothing.year = data.year;
      this.clothing.price = data.price;
      this.clothing.brand = data.brand;
      this.clothing.type = data.type;
      this.clothingsService.saveClothing(this.clothing).subscribe(response => {
        this.modalReference.close();
        this.consultarClothings();
      });

    } else {
      this.clothingsService.updateClothing(this.clothing).subscribe(response => {
        this.modalReference.close();
        this.consultarClothings();
      })
    }
  // if (this.clothing.price && this.clothing.price.trim() !== '') {
      //console.log(this.lbl_mensaje);
    //}
  }
  /**
   * Metodo que permite eliminar un registro.
   * @param Clothing 
   */
  showWindowDelete(clothing: Clothing) {
    this.submitted = false;
    Swal.fire({
      title: this.lbl_confirm,
      text: this.lbl_are_you + ' ' + this.lbl_clothing_delete,
      //text: `Are you sure clothing delete ${clothing.garment_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {

        this.clothingsService.deleteClothing(clothing.id).subscribe(response => {
          this.consultarClothings();
          Swal.fire(
            'Deleted!',
            `Your clothing has been deleted.`,
            'success'
          )
        });
      }
    })
  }
}
