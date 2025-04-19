const companies = {
  empresaA: {
    name: "Empresa A",
    welcomeMessage: "Bem-vindo(a) à Empresa A! Somos especializados em eletrônicos.",
    products: [
      { name: "Smartphone X", price: "R$ 2.000,00", details: "Tela 6.5 polegadas, 128GB de armazenamento." },
      { name: "Notebook Y", price: "R$ 5.000,00", details: "16GB RAM, SSD 512GB." }
    ],
    orderMessage: "Por favor, envie os detalhes do seu pedido para a Empresa A (ex.: produto e quantidade).",
    attendantMessage: "Encaminhando para um atendente da Empresa A... Por favor, aguarde."
  },
  empresaB: {
    name: "Empresa B",
    welcomeMessage: "Olá! Bem-vindo(a) à Empresa B! Temos os melhores produtos de moda.",
    products: [
      { name: "Camiseta Estampada", price: "R$ 50,00", details: "Tamanhos P, M, G, 100% algodão." },
      { name: "Calça Jeans", price: "R$ 120,00", details: "Tamanhos 38 a 44, azul escuro." }
    ],
    orderMessage: "Por favor, envie os detalhes do seu pedido para a Empresa B (ex.: produto e quantidade).",
    attendantMessage: "Encaminhando para um atendente da Empresa B... Por favor, aguarde."
  }
};

// Você pode definir a empresa ativa aqui (ex.: "empresaA" ou "empresaB")
const activeCompany = "empresaA";

module.exports = { companies, activeCompany };