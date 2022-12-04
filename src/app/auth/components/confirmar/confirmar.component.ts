import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario ) { }

  ngOnInit(): void {
  }

  borrar() {
    this.dialogRef.close(true);
    }

    cerrar(){
    this.dialogRef.close();
    }

}
