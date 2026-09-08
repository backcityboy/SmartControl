document.addEventListener("DOMContentLoaded", function () {
    configurarMenus();
    configurarTema();
    configurarPesquisaDashboard();
    configurarModais();
    configurarConexoes();
    configurarLoja();
    configurarConfiguracoes();
    configurarCamera();
});

function configurarMenus() {
    const avatar = document.getElementById("avatar-btn");
    const smartControl = document.getElementById("smartcontrol-btn");
    const menuPerfil = document.getElementById("submenu_perfil");
    const menuPrincipal = document.getElementById("menu_principal");

    if (avatar && menuPerfil && menuPrincipal) {
        avatar.addEventListener("click", function () {
            menuPerfil.classList.toggle("active");
            menuPrincipal.classList.remove("active");
        });
    }

    if (smartControl && menuPrincipal && menuPerfil) {
        smartControl.addEventListener("click", function () {
            menuPrincipal.classList.toggle("active");
            menuPerfil.classList.remove("active");
        });
    }

    document.addEventListener("click", function (event) {
        if (event.target.closest(".profile-wrapper") || event.target.closest(".smartcontrol-wrapper")) {
            return;
        }

        menuPerfil?.classList.remove("active");
        menuPrincipal?.classList.remove("active");
    });
}

function configurarTema() {
    const camera = document.querySelector(".pagina-camera");
    const botaoTema = document.getElementById("theme-toggle");

    if (camera) {
        return;
    }

    const temaSalvo = localStorage.getItem("tema-smartcontrol") || "escuro";
    aplicarTema(temaSalvo);

    if (botaoTema) {
        botaoTema.addEventListener("click", function () {
            const temaAtual = document.body.classList.contains("tema-claro") ? "claro" : "escuro";
            aplicarTema(temaAtual === "claro" ? "escuro" : "claro");
        });
    }
}

function aplicarTema(tema) {
    document.body.classList.toggle("tema-claro", tema === "claro");
    localStorage.setItem("tema-smartcontrol", tema);

    const botaoTema = document.getElementById("theme-toggle");
    if (botaoTema) {
        botaoTema.textContent = tema === "claro" ? "Modo escuro" : "Modo claro";
    }
}

function configurarPesquisaDashboard() {
    const pesquisa = document.getElementById("card-search");

    if (!pesquisa) {
        return;
    }

    const cards = document.querySelectorAll("main .cards, main .cards2");

    pesquisa.addEventListener("input", function () {
        const texto = pesquisa.value.toLowerCase();

        cards.forEach(function (card) {
            card.style.display = card.textContent.toLowerCase().includes(texto) ? "" : "none";
        });
    });
}

function configurarModais() {
    document.querySelectorAll("[data-modal]").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const modal = document.getElementById(botao.dataset.modal);
            modal?.classList.add("ativo");
        });
    });

    document.querySelectorAll(".fechar-modal").forEach(function (botao) {
        botao.addEventListener("click", function () {
            botao.closest(".modal-fundo")?.classList.remove("ativo");
        });
    });

    document.querySelectorAll(".modal-fundo").forEach(function (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.remove("ativo");
            }
        });
    });
}

function configurarConexoes() {
    const listaPessoas = document.querySelectorAll(".perfil-conexao");
    const pesquisa = document.getElementById("pesquisa_pessoas");
    const modal = document.getElementById("modal_perfil");

    if (!listaPessoas.length) {
        return;
    }

    listaPessoas.forEach(function (pessoa) {
        pessoa.addEventListener("click", function () {
            if (!modal) {
                return;
            }

            document.getElementById("modal_banner")?.setAttribute("src", pessoa.dataset.banner);
            document.getElementById("modal_foto")?.setAttribute("src", pessoa.dataset.src);
            document.getElementById("modal_apelido").textContent = pessoa.dataset.nome;
            document.getElementById("modal_email").textContent = pessoa.dataset.email;
            modal.classList.add("ativo");
        });
    });

    pesquisa?.addEventListener("input", function () {
        const texto = pesquisa.value.toLowerCase();

        listaPessoas.forEach(function (pessoa) {
            pessoa.style.display = pessoa.textContent.toLowerCase().includes(texto) ? "" : "none";
        });
    });
}

function configurarLoja() {
    const imagem = document.getElementById("imagem_loja");
    const esquerda = document.getElementById("seta_esquerda_loja");
    const direita = document.getElementById("seta_direita_loja");

    if (!imagem || !esquerda || !direita) {
        return;
    }

    const imagens = [
        "assets/images/camera-seguranca.png",
        "assets/images/smart-bulb.jpg",
        "assets/images/smart-lock.avif"
    ];
    let indice = 0;

    function atualizarImagem() {
        imagem.src = imagens[indice];
    }

    esquerda.addEventListener("click", function () {
        indice = (indice - 1 + imagens.length) % imagens.length;
        atualizarImagem();
    });

    direita.addEventListener("click", function () {
        indice = (indice + 1) % imagens.length;
        atualizarImagem();
    });
}

function configurarConfiguracoes() {
    const botoes = document.querySelectorAll("[data-config]");

    if (!botoes.length) {
        return;
    }

    const paineis = document.querySelectorAll(".painel-configuracao");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            botoes.forEach(function (item) {
                item.classList.remove("ativo");
            });

            paineis.forEach(function (painel) {
                painel.classList.remove("ativo");
            });

            botao.classList.add("ativo");
            document.getElementById("config_" + botao.dataset.config)?.classList.add("ativo");
        });
    });
}

function configurarCamera() {
    const interfaceCamera = document.querySelector(".camera-interface");
    const esquerda = document.getElementById("seta_esquerda_camera");
    const direita = document.getElementById("seta_direita_camera");

    if (!interfaceCamera || !esquerda || !direita) {
        return;
    }

    const imagens = [
        "assets/images/camera-01.webp",
        "assets/images/camera-02.gif",
        "assets/images/camera-03.webp"
    ];
    let indice = 0;

    function atualizarImagem() {
        interfaceCamera.style.backgroundImage = "url('" + imagens[indice] + "')";
    }

    esquerda.addEventListener("click", function () {
        indice = (indice - 1 + imagens.length) % imagens.length;
        atualizarImagem();
    });

    direita.addEventListener("click", function () {
        indice = (indice + 1) % imagens.length;
        atualizarImagem();
    });

    atualizarImagem();
}
