// 1. Função de sanitização (Prevenção de XSS)
export function escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  }
  
  // 2. Validação do ano de lançamento
  export function validarAnoFilme(ano) {
    const anoNum = Number(ano);
    const anoAtual = new Date().getFullYear();
    return anoNum >= 1888 && anoNum <= anoAtual + 5;
  }