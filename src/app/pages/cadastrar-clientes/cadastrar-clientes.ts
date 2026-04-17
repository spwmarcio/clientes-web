import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-clientes.html',
  styleUrl: './cadastrar-clientes.css',
})
export class CadastrarClientes {

  // Atributo para armazenar os dados vindos da conulta da API
  niveisCliente = signal<any[]>([]);

  // Instanciar a classe HTTPCLIENT
  http = inject(HttpClient);

  // formulario para capturar os campos do cadastro do cliente
  formcadastro = new FormGroup({
    nome : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(150)]),
    cpf : new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    telefone : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
    nivel : new FormControl('',[Validators.required]),
  })

// Função executada ao abrir o componente
  ngOnInit() {
    //console.log('Componente CadastrarClientes carregado');
    // Fazendo uma chamada / requisição para o endpoint da API de clientes
    // para consultar as opções do enum de níveis de cliente
      this.http.get('http://localhost:5166/api/v1/Enum/niveis-cliente')
      .subscribe((data) => {

        //Armazenar os dados da API na variavel signal
        this.niveisCliente.set(data as any[]);
      });
  }

  //Função para capturar o evento de SUBMIT do formulário
  cadastrarCliente() {
    //Fazendo uma requisição POST para a API (Cadastro do cliente)
    this.http.post('http://localhost:5166/api/v1/clientes/cadastrar-cliente', this.formcadastro.value)
      .subscribe({
        next : (data) => { //capturando o retorno de sucesso da API
          console.log(data);
        },
        error : (e) => { //capturando o retorno de erro da API
          console.log(e.error);
        }
      })
  }

}


