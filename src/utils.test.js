// src/utils.test.js
import { describe, it, expect } from 'vitest';
import { escapeHtml, validarAnoFilme } from './utils.js';

// describe('Testes de Sanitização (escapeHtml)', () => {
//   it('deve converter caracteres especiais em entidades HTML seguras', () => {
//     const inputInseguro = '<script>alert("XSS")</script>';
//     const resultadoEsperado = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
    
//     expect(escapeHtml(inputInseguro)).toBe(resultadoEsperado);
//   });

//   it('não deve alterar textos simples que não possuem caracteres especiais', () => {
//     expect(escapeHtml('Interestelar')).toBe('Interestelar');
//   });
// });

describe('Testes de Validação do Ano do Filme', () => {
  it('deve aceitar um ano válido dentro do intervalo', () => {
    expect(validarAnoFilme(2014)).toBe(true);
  });

  it('deve rejeitar anos anteriores ao surgimento do cinema (antes de 1888)', () => {
    expect(validarAnoFilme(1800)).toBe(false);
  });

  // it('deve rejeitar anos anteriores ao surgimento do cinema  verdadeiro (antes de 1888)', () => {
  //   expect(validarAnoFilme(1800)).toBe(true);
  // });
});