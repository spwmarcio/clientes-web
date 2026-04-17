import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastrar-clientes.html',
  styleUrl: './cadastrar-clientes.css',
})
export class CadastrarClientes {

  // Atributo para armazenar os dados vindos da conulta da API
  niveisCliente = signal<any[]>([]);

  // Instanciar a classe HTTPCLIENT
  http = inject(HttpClient);

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

}
