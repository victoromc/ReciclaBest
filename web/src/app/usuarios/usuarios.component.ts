import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { UsuariosModel } from './usuarios.model';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  user: UsuariosModel = new UsuariosModel();

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }
  
  onSubmitCadastro(f: NgForm) {
    if (!f.valid) {
      alert('Favor preencher todos os campos');
    } else {
      this.cadastrarUsuario();
    }
  }
  cadastrarUsuario() {
    this.usuarioService.cadastrarUsuario(this.user).subscribe(user => {
      this.user = new UsuariosModel();
      alert('Cadastrado com sucesso!')
    }, err => {
      console.log(err);
      if(err.error){
        if(err.error.error){
          if(err.error.error.includes('CPF')){
            alert('CPF já existente')
          }
        }
      }
    });
  }
}

