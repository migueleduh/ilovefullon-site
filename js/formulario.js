const form = document.querySelector("form");
const mensagemSucesso = document.getElementById("mensagemSucesso");

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("nome")) {
    form.nome.value = localStorage.getItem("nome");
  }
  if (localStorage.getItem("email")) {
    form.email.value = localStorage.getItem("email");
  }
});

// jQuery DOM ready para máscara e submit
$(document).ready(function () {
  $("#phone").mask("(00) 00000-0000");

  $("form").on("submit", async function (e) {
    e.preventDefault();

    // Validação do textarea
    if (!form.mensagem.value.trim()) {
      alert("Por favor, preencha a mensagem.");
      form.mensagem.focus();
      return;
    }

    // Salvar no localStorage
    localStorage.setItem("nome", form.nome.value);
    localStorage.setItem("email", form.email.value);

    // Dados do formulário
    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      phone: form.phone.value,
      assunto: form.assunto.value,
      mensagem: form.mensagem.value,
    };

    try {
      // Envia para API fake (exemplo jsonplaceholder)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar formulário");

      // Exibir mensagem sucesso animada 
      if ($("#mensagemSucesso").length === 0) {
        $(this).after('<p id="mensagemSucesso" style="color: lightgreen; display: none;">Mensagem enviada com sucesso!</p>');
      }
      $("#mensagemSucesso").stop().fadeIn(500).delay(2000).fadeOut(500);

      form.reset(); // limpa formulário
    } catch (error) {
      alert("Erro ao enviar formulário, tente novamente mais tarde.");
      console.error(error);
    }
  });
});
