import FRONT_URI from "../admin/uri.front";

const portuguese = [
    {
        "navbar": {
            "about": "Sobre Nós",
            "service": "Serviços",
            "VIPRO": "VIPRO",
            "Contact": "Contato",
            "lang": {
                "name": "Idioma",
                "lang_name": {
                    "spanish": {
                        "name": "Espanhol",
                        "img": "/img/lang/spanish.png"
                    },
                    "english": {
                        "name": "Inglês",
                        "img": "/img/lang/english.png"
                    },
                    "Portuguese": {
                        "name": "Português",
                        "img": "/img/lang/portuguese.png"
                    }
                }
            },
            "signin": "Entrar",
            "signup": "Cadastrar-se"
        },
        "banner": {
            "title": "Abra as portas para o mundo!",
            "todovisa": "TODOVISA"
        },
        "about": {
            "title": "Descubra Novos Horizontes com a TODOVISA!",
            "description": "Bem-vindo à TODOVISA! Somos uma empresa dedicada a abrir portas para inúmeras oportunidades de crescimento, aventura e inovação. Em nossa comunidade, promovemos a criatividade e a realização de sonhos.",
            "description02": "Nos esforçamos para derrubar barreiras e redefinir o conceito de sucesso. Com paixão e compromisso, guiamos nossos clientes em uma jornada emocionante em direção a um futuro mais brilhante, onde cada passo o aproxima de alcançar todo o seu potencial. Descubra como podemos ajudá-lo a realizar seus sonhos.",
            "not_available": "Não disponível",
            "see_more": "Ver mais",
            "countries": {
                "usa": {
                    "name": "Estados Unidos",
                    "description": "Um país da América do Norte conhecido por sua diversidade cultural, economia poderosa e liderança global em política e tecnologia.",
                    "img": "/img/carrousel/estadosunidos.jpg",
                    "uri": "/country/estadosunidos"
                },
                "canada": {
                    "name": "Canadá",
                    "description": "Um país da América do Norte famoso por suas vastas paisagens naturais, multiculturalismo e alta qualidade de vida.",
                    "img": "/img/carrousel/canada.jpg",
                    "uri": "/country/canada"
                },
                "mexico": {
                    "name": "México",
                    "description": "Um país da América do Norte rico em cultura, história, praias paradisíacas e vida urbana vibrante.",
                    "img": "/img/carrousel/mexico.jpg",
                    "uri": "/country/mexico"
                },
                "uk": {
                    "name": "Inglaterra",
                    "description": "Parte do Reino Unido famosa por sua rica história, contribuições para a literatura e ciência, e sua monarquia.",
                    "img": "/img/carrousel/inglaterra.jpg",
                    "uri": "/country/inglaterra"
                },
                "china": {
                    "name": "China",
                    "description": "Um país asiático conhecido por sua antiga civilização, avanços tecnológicos e econômicos, e maravilhas como a Grande Muralha e a Cidade Proibida.",
                    "img": "/img/carrousel/china.jpg",
                    "uri": "/country/china"
                },
                "australia": {
                    "name": "Austrália",
                    "description": "Um país da Oceania famoso por sua fauna única, paisagens naturais impressionantes como a Grande Barreira de Coral e um estilo de vida relaxado.",
                    "img": "/img/carrousel/australia.jpg",
                    "uri": "/country/australia"
                },
                "india": {
                    "name": "Índia",
                    "description": "Um país do Sul da Ásia conhecido por sua diversidade cultural, riqueza histórica e espiritualidade, lar de monumentos como o Taj Mahal.",
                    "img": "/img/carrousel/india.jpg",
                    "uri": "/country/india"
                }
            }
        },
        "VIPRO": {
            "title": "Formulário VIPRO",
            "subtitle": {
                "title": "Pronto para dar o próximo passo para o seu visto?",
                "strong": "Estamos aqui para apoiar você em cada etapa do caminho!"
            },
            "text": "Este formulário fornecerá uma avaliação do seu perfil para obter seu visto. Não se preocupe se não tiver todas as informações agora, estamos aqui para orientá-lo em todos os momentos. Basta clicar no botão e responder às perguntas para saber sua prontidão.",
            "strong": "Ao preencher o formulário, você receberá um desconto de 25% no próximo passo da consultoria de visto com",
            "button": "Preencher Formulário"
        },
        "contact": {
            "title": "Contato",
            "form": {
                "title": "Escreva para nós",
                "subtitle": "Estamos aqui para ajudar você.",
                "subtitle2": "Diga-nos como podemos ajudar!",
                "name": "Nome Completo",
                "email": "Email",
                "body": "Escreva sua mensagem",
                "button": "Enviar Email"
            },
            "info": {
                "location": "67 Avenida Sur Local #1, San Salvador",
                "schedule": "Segunda a sexta: 8:30 - 18:00, Sábados: 9:00 - 17:00, Domingos: Fechado"
            }
        },
        "footer": {
            "about": "Sobre Nós",
            "service": "Serviços",
            "VIPRO": "VIPRO",
            "Contact": "Contato",
            "copi": "© 2024 TodoVisa S.A de C.V"
        },
        "popupWithoutLogin": {
            "title": "Oops...",
            "description": "Você deve fazer login para realizar esta ação.",
            "button": "Aceitar!"
        },
        "popupWithLogin": {
            "title": "Escolha uma Opção:",
            "description": "Selecione uma das opções disponíveis para continuar com o formulário. Oferecemos uma ampla variedade de serviços adaptados às suas necessidades. Reserve um tempo para revisar cada opção e escolha a que melhor se adequa às suas necessidades. <strong>Faça sua seleção e prossiga para o próximo passo!</strong>",
            "button": "Continuar"
        },
        "whatsapp": {
            "status": "Online",
            "message": "Olá! 👋 \nBem-vindo ao Todovisa. \nComo podemos ajudá-lo hoje?",
            "placeholder": "Digite uma mensagem"
        },
        "form": {
            "return": "Voltar para a Página Inicial",
            "title": "Formulário de Solicitação de Visto",
            "description": "Abaixo você encontrará o formulário de solicitação de visto que deve preencher para processar seu pedido. Solicitamos que você preencha todos os campos com as informações mais precisas e atualizadas possíveis. Isso nos permitirá avaliar sua solicitação de maneira eficiente e rápida.",
            "acept": "Eu aceito os ",
            "terms": "Termos e Condições",
            "send_form": "Enviar Formulário",
            "reload_form": "Reiniciar Formulário",
            "terms_and_conditions": "<strong>1. Aceitação dos Termos</strong><br><br>Ao acessar e usar este formulário de solicitação de visto, você concorda em cumprir estes termos e condições. Se você não concordar com algum destes termos, não use este formulário.<br><br><strong>2. Uso do Formulário</strong><br><br>Este formulário é destinado ao uso pessoal e não comercial. Você concorda em fornecer informações precisas e completas ao preencher o formulário.<br><br><strong>3. Privacidade das Informações</strong><br><br>Todas as informações fornecidas neste formulário serão usadas exclusivamente para processar sua solicitação de visto. Não compartilharemos suas informações com terceiros sem o seu consentimento, exceto quando exigido por lei.<br><br><strong>4. Limitação de Responsabilidade</strong><br><br>Não garantimos que o uso do formulário será ininterrupto ou livre de erros. Não seremos responsáveis por quaisquer danos resultantes do uso deste formulário, incluindo, mas não se limitando a, danos diretos, indiretos, incidentais, punitivos e consequenciais.<br><br><strong>5. Modificações nos Termos</strong><br><br>Reservamo-nos o direito de modificar estes termos e condições a qualquer momento. As alterações serão publicadas nesta página e o uso contínuo do formulário constituirá aceitação dos termos modificados.<br><br><strong>6. Lei Aplicável</strong><br><br>Estes termos e condições serão regidos e interpretados de acordo com as leis do país onde a solicitação de visto é processada, sem dar efeito a quaisquer disposições de conflito de leis.<br><br><strong>7. Contato</strong><br><br>Se você tiver alguma dúvida sobre estes termos e condições, entre em contato conosco através dos nossos canais de atendimento ao cliente.",
            "button": "Aceitar!",
            "button2": "Cancelar!",
            "warning": "Você deve aceitar os termos e condições antes de salvar o formulário.",
            "alert_save": "Tem certeza de que deseja salvar?",
            "obligatory_field": "Este campo é obrigatório. Por favor, insira um valor.",
            "select_option": "Selecione uma opção",
            "save": "Salvando formulário",
            "wait": "Aguarde um momento...",
            "error_save": "Ocorreu um erro ao salvar o formulário. Tente novamente.",
            "success_save": "Formulário salvo com sucesso!",
            "submit_form": "Formulário enviado com sucesso!",
            "form_resent": "Formulário reenviado com sucesso!",
            "send_error": "Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde."
        },
        "signin": {
            "title": "Entrar",
            "subtitle": "Bem-vindo de volta! Faça login para continuar.",
            "email": "Email",
            "password": "Senha",
            "button": {
                "loading_text": "Carregando...",
                "default_text": "Entrar"
            },
            "or_signin": "Ou entre com",
            "question": "Não tem uma conta?",
            "link": "Cadastrar-se"
        },
        "signup": {
            "title": "Cadastrar-se",
            "subtitle": "Junte-se à nossa comunidade! Crie sua conta para começar.",
            "first_name": "Nome",
            "last_name": "Sobrenome",
            "email": "Email",
            "password": "Senha",
            "confirm_password": "Confirmar Senha",
            "button": {
                "loading_text": "Carregando...",
                "default_text": "Cadastrar-se"
            },
            "or_signup": "Ou cadastre-se com",
            "question": "Já tem uma conta?",
            "link": "Entrar"
        },
        "mexico": {
            "first_section": {
                "introduccion": "Viajar para o México é uma experiência enriquecedora e atraente por várias razões, incluindo sua riqueza cultural, impressionantes pontos turísticos e hospitalidade. Aqui estão algumas das principais razões pelas quais as pessoas escolhem o México como destino de viagem:",
                "secciones": [
                    {
                        "titulo": "Riqueza Cultural",
                        "descripcion": "O México é conhecido por seu rico patrimônio cultural, refletido em suas festas, tradições, gastronomia e arte.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/artes_mexico.jpg",
                                "titulo": "Artes e Artesanato",
                                "descripcion": "Celebrações como o Día de los Muertos, reconhecido pela UNESCO como Patrimônio Cultural Imaterial da Humanidade, oferecem aos visitantes uma visão profunda das tradições mexicanas."
                            },
                            {
                                "imagen": "mexico/festividad_mexico.jpg",
                                "titulo": "Festividades",
                                "descripcion": "A culinária mexicana, também declarada Patrimônio Cultural Imaterial da Humanidade pela UNESCO, é famosa mundialmente. Pratos como tacos, mole e pozole são apenas alguns exemplos da diversidade culinária do país."
                            },
                            {
                                "imagen": "mexico/gastronomia_mexico.jpg",
                                "titulo": "Gastronomia",
                                "descripcion": "O México possui uma rica tradição de artesanato, incluindo têxteis, cerâmicas e joias. Obras de artistas como Frida Kahlo e Diego Rivera também são grandes atrações culturais."
                            }
                        ]
                    },
                    {
                        "titulo": "Locais Históricos",
                        "descripcion": "O México abriga inúmeros sítios arqueológicos que atraem turistas de todo o mundo.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/itza_mexico.jpg",
                                "titulo": "Chichen Itza",
                                "descripcion": "Uma das Novas Sete Maravilhas do Mundo, esta antiga cidade maia em Yucatán é famosa pela pirâmide de Kukulkan."
                            },
                            {
                                "imagen": "mexico/teotihuacan_mexico.jpg",
                                "titulo": "Teotihuacan",
                                "descripcion": "Localizada perto da Cidade do México, esta antiga cidade pré-hispânica é conhecida por suas massivas Pirâmides do Sol e da Lua."
                            },
                            {
                                "imagen": "mexico/tulum_mexico.jpg",
                                "titulo": "Tulum",
                                "descripcion": "Este sítio maia na Riviera Maya combina ruínas históricas com vistas deslumbrantes do Mar do Caribe."
                            }
                        ]
                    },
                    {
                        "titulo": "Pontos Turísticos Populares",
                        "descripcion": "O México oferece uma ampla variedade de destinos turísticos que atendem a diferentes interesses, desde praias até cidades coloniais.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/cancun.jpg",
                                "titulo": "Cancún e Riviera Maya",
                                "descripcion": "Conhecidos por suas praias de areia branca e águas turquesa, são destinos populares para turismo de sol e praia."
                            },
                            {
                                "imagen": "mexico/cdmx.webp",
                                "titulo": "Cidade do México",
                                "descripcion": "A capital do país é uma metrópole vibrante com uma rica oferta cultural, incluindo museus, teatros e uma cena gastronômica de primeira classe."
                            },
                            {
                                "imagen": "mexico/vallarta.webp",
                                "titulo": "Puerto Vallarta",
                                "descripcion": "Localizada na costa do Pacífico, é famosa por seu calçadão, vida noturna e atividades aquáticas."
                            }
                        ]
                    },
                    {
                        "titulo": "Diversidade Natural",
                        "descripcion": "O México oferece uma grande diversidade de paisagens naturais, desde desertos até florestas tropicais.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/barrancas.jpg",
                                "titulo": "Canyon do Cobre",
                                "descripcion": "Localizadas no estado de Chihuahua, essas impressionantes formações geológicas são ideais para ecoturismo e atividades ao ar livre."
                            },
                            {
                                "imagen": "mexico/xearet.webp",
                                "titulo": "Xcaret e Xel-Há",
                                "descripcion": "Parques ecológicos na Riviera Maya que combinam atrações naturais com atividades culturais e recreativas."
                            },
                            {
                                "imagen": "mexico/sierra_gorda.jpeg",
                                "titulo": "Sierra Gorda em Querétaro",
                                "descripcion": "Uma região com biodiversidade excepcional, ideal para ecoturismo e observação da flora e fauna."
                            }
                        ]
                    },
                    {
                        "titulo": "Hospitalidade e Acessibilidade",
                        "descripcion": [
                            "O México é conhecido pelo calor e hospitalidade de seu povo, fazendo com que os turistas se sintam bem-vindos e confortáveis. Além disso, sua proximidade com países como os Estados Unidos e o Canadá, juntamente com uma boa infraestrutura turística, torna a viagem ao México acessível e conveniente.",
                            "Em resumo, a combinação de rico patrimônio cultural, impressionantes locais históricos, diversos destinos turísticos, diversidade natural e hospitalidade fazem do México um destino turístico de primeira linha, atraente para viajantes de todo o mundo."
                        ]
                    },
                    {
                        "titulo": "Requisitos de Visto 2024",
                        "descripcion": "A partir de 2024, cidadãos dos seguintes países latino-americanos precisarão de visto para entrar no México:",
                        "lista": [
                            "Antígua e Barbuda",
                            "Brasil",
                            "Cuba",
                            "Equador",
                            "El Salvador",
                            "Guatemala",
                            "Guiana",
                            "Haiti",
                            "Honduras",
                            "Nicaragua",
                            "República Dominicana",
                            "São Cristóvão e Névis",
                            "Santa Lúcia",
                            "Suriname",
                            "Venezuela"
                        ]
                    }
                ]
            },
            "title": "Processo de Aplicação para Visto",
            "sections": [
                {
                    "title": "1. Introdução ao Processo",
                    "paragraphs": [
                        "Para iniciar o processo de solicitação de visto, é essencial entender os requisitos específicos para o tipo de visto que você deseja obter, seja para turismo ou outra categoria. É importante revisar cuidadosamente as informações correspondentes à categoria de visto selecionada.",
                        "Se você atender aos requisitos e precisar de uma consulta, você pode reunir e digitalizar todos os documentos necessários e enviá-los para este endereço de e-mail. Após receber e verificar sua documentação, entraremos em contato para agendar uma consulta e continuar com o processo. Abaixo, você encontrará uma lista de todas as categorias de visto e seus requisitos específicos."
                    ]
                },
                {
                    "title": "2. Requisitos Gerais para Vistos de Turismo e Trânsito",
                    "subsections": [
                        {
                            "title": "Documentação Necessária",
                            "items": [
                                {
                                    "text": "Passaporte: Apresente o original e uma cópia."
                                },
                                {
                                    "text": "Fotografia Recente: Tamanho de passaporte, colorida, rosto visível sem óculos. Dimensões: mínimo 32,0 mm x 26 mm, máximo 39,0 mm x 31,0 mm. Fundo branco e tirada de frente."
                                },
                                {
                                    "text": "Formulário de Imigração: Você pode preencher seu formulário conosco, Formulário TODOVISA",
                                    "link": `${FRONT_URI}/#vipro`
                                },
                                {
                                    "text": "Documento de Permanência Legal (Não necessário para salvadorenhos): Se você não é nacional do país onde está solicitando o visto, apresente o original e uma cópia do documento que comprova sua permanência legal em El Salvador."
                                },
                                {
                                    "text": "Documentação Adicional (atenda a pelo menos uma das seguintes condições; A, B, C, D, E, F, G):",
                                    "subitems": [
                                        {
                                            "title": "A. Por Residência:",
                                            "options": [
                                                {
                                                    "text": "Opção 1: Escritura pública de imóvel (mínimo 2 anos) e comprovação de emprego estável (mínimo 2 anos)."
                                                },
                                                {
                                                    "text": "Opção 2: Escritura pública de imóvel (mínimo 2 anos) e um documento comprovando a propriedade ou participação em empresas, emitido pela autoridade competente e registrado no Ministério das Finanças com um mínimo de dois anos, bem como a última declaração de impostos ou a conta bancária da empresa com a média anual (mínimo 2 anos)."
                                                },
                                                {
                                                    "text": "Nota Importante: Com a Opção 1 e 2 para Residência, é necessário apresentar um certificado emitido pelo Centro Nacional de Registro (CNR) com a data atual, indicando que o imóvel está em seu nome e o tempo de registro, desde que o imóvel não esteja hipotecado."
                                                }
                                            ]
                                        },
                                        {
                                            "title": "B. Por Solvência Econômica - Por Emprego, Conta Bancária ou Depósitos a Prazo:",
                                            "options": [
                                                {
                                                    "title": "Por Emprego",
                                                    "text": "Equivalente a 100 dias do salário mínimo na Cidade do México, com um valor aproximado com base no salário mínimo a partir de 1º de janeiro de 2024: $1.461 USD."
                                                },
                                                {
                                                    "title": "Por Conta Bancária",
                                                    "text": "Equivalente a 300 dias do salário mínimo na Cidade do México, com um valor aproximado com base no salário mínimo a partir de 1º de janeiro de 2024: $4.380 USD (média trimestral)."
                                                },
                                                {
                                                    "title": "Opção 1: Por Emprego",
                                                    "details": [
                                                        "Apresente comprovante de emprego estável (mínimo 1 ano) com as seguintes características:",
                                                        "Nome completo, cargo, tempo de serviço e salário líquido.",
                                                        "Detalhes de contato da empresa (endereço, telefone, e-mail).",
                                                        "Cópia simples do D.U.I. da pessoa que assinou a carta.",
                                                        "Cópia do NIT da empresa.",
                                                        "A carta deve ser emitida no papel timbrado da empresa.",
                                                        "As cartas de emprego são aceitas com uma validade de um mês a partir da data de emissão.",
                                                        "O salário mensal deve ser superior a $1.461,00 USD (livre de deduções legais como imposto de renda, AFP e ISSS).",
                                                        "Você deve incluir a conta bancária onde os pagamentos de salário são depositados (Descrições da carta ou extrato bancário são encontrados na Opção 2: Conta Bancária)"
                                                    ],
                                                    "note": "Valores de Avaliação de 2024 Por Emprego: Você deve ter um salário trimestral igual ou superior ao equivalente a 100 dias do salário mínimo na Cidade do México, com um valor aproximado com base no salário mínimo a partir de 1º de janeiro de 2024: $1.461 USD."
                                                },
                                                {
                                                    "title": "Opção 2: Por Conta Bancária",
                                                    "details": [
                                                        "Se for por conta bancária pessoal, você deve apresentar um certificado emitido pelo seu banco, com as seguintes características:",
                                                        "Nome completo do titular da conta.",
                                                        "Número(s) da conta bancária.",
                                                        "Data de abertura da(s) conta(s).",
                                                        "Nome, cargo e assinatura do executivo do banco que assinou a carta.",
                                                        "Carimbo oficial do banco.",
                                                        "O certificado deve ser emitido no papel timbrado do banco."
                                                    ],
                                                    "note": "Valores de Avaliação de 2024 Por Conta Bancária: A conta bancária deve manter um saldo médio trimestral igual ou superior ao equivalente a 300 dias do salário mínimo na Cidade do México, com um valor aproximado com base no salário mínimo a partir de 1º de janeiro de 2024: $4.380 USD (média trimestral)."
                                                },
                                                {
                                                    "title": "Opção 3: Depósitos a Prazo ou Valores e Ações.",
                                                    "details": [
                                                        "A prova de investimento é certificada por depósitos a prazo ou valores e ações. Se for um certificado de prazo fixo, você deve apresentar uma carta original do banco com as seguintes características:",
                                                        "Data de abertura e vencimento.",
                                                        "Nome do titular.",
                                                        "Montante, prazo.",
                                                        "Número da conta.",
                                                        "Extrato da conta dos últimos 6 meses.",
                                                        "Cópia do certificado de depósito a prazo com validade de 3 meses a partir de $4.380,00 ou mais, juntamente com contas bancárias (saldo médio mensal equivalente a 300 dias do salário mínimo, últimos 3 meses)."
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "title": "C. Estudantes com Emprego:",
                                            "details": [
                                                "Comprovante de estudos e emprego, pensão ou bolsa.",
                                                "Renda equivalente a 60 dias do salário mínimo na Cidade do México, últimos 3 meses."
                                            ]
                                        },
                                        {
                                            "title": "D. Por Convite de uma Organização ou Instituição Pública ou Privada:",
                                            "details": [
                                                "IMPORTANTE: Cartas de convite são válidas apenas se vierem de organizações ou instituições públicas ou privadas. Convites de indivíduos não são aceitos.",
                                                "A Carta de Convite deve conter:",
                                                "Nome completo do solicitante e sua nacionalidade.",
                                                "Nome ou razão social da organização.",
                                                "Registro oficial ou licença.",
                                                "Propósito da organização ou instituição privada ou pública.",
                                                "Endereço completo e detalhes de contato da organização ou instituição.",
                                                "Informações detalhadas sobre a atividade que o solicitante realizará ou o projeto em que participará.",
                                                "Nome ou razão social da organização.",
                                                "Duração estimada ou data aproximada de término da atividade que o solicitante realizará.",
                                                "Compromisso de cobrir a manutenção total da pessoa convidada durante sua estadia no México e seu retorno ao país de origem ou residência.",
                                                "Cópia do documento oficial com assinatura e fotografia da pessoa que assinou a carta."
                                            ]
                                        },
                                        {
                                            "title": "E. Pessoas com 65 Anos ou Mais:",
                                            "details": ["Se o solicitante de visto de turismo tiver mais de 65 anos e puder provar de maneira convincente, ao critério da autoridade de imigração, que seu objetivo é visitar o território nacional para turismo, não será necessário provar solvência econômica."]
                                        },
                                        {
                                            "title": "F. Viajante Frequente:",
                                            "details": ["Mostrar uma cópia das páginas do passaporte com três vistos válidos ou carimbos de controle de imigração de países não fronteiriços visitados nos últimos 12 meses."]
                                        },
                                        {
                                            "title": "Nota Adicional:",
                                            "text": "Menores: É necessário a presença dos pais com documentos de identificação e prova de vínculo familiar com um documento oficial."
                                        },
                                        {
                                            "title": "G. Estudantes - Residência Temporária:",
                                            "details": [
                                                "Se seu visto de estudante for aprovado, a taxa de processamento será de $53,00 USD, que deve ser paga em dinheiro com o valor exato no dia de sua consulta.",
                                                "Carta de Aceitação Original da Instituição Educacional pertencente ao Sistema Educacional Nacional do México em que você pretende estudar, especificando:",
                                                "1. Nome completo do solicitante",
                                                "2. Nível, grau e área de estudo que o solicitante pretende seguir",
                                                "3. Nome do curso no qual você foi aceito",
                                                "4. Data de início e término do curso",
                                                "5. Custo da matrícula do curso e",
                                                "6. Detalhes de identificação da instituição educacional (ID da pessoa que assinou a carta de aceitação, por exemplo, INE, Passaporte ou RFC)"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "canada": {
            "first_section": {
                "introduccion": "O Canadá é conhecido pela sua alta qualidade de vida, pelo seu sistema de saúde universal e pelas suas impressionantes paisagens naturais. Oferece oportunidades únicas para estudantes, profissionais e turistas.",
                "secciones": [
                    {
                        "titulo": "Oportunidades de Estudo",
                        "descripcion": "O Canadá é um destino popular para estudantes internacionais devido às suas instituições educacionais de alta qualidade e ao seu ambiente multicultural.",
                        "tarjetas": [
                            {
                                "imagen": "canada/universidad_canada.jpg",
                                "titulo": "Universidades Prestigiadas",
                                "descripcion": "O Canadá abriga algumas das universidades mais prestigiadas do mundo, oferecendo uma gama de programas acadêmicos."
                            },
                            {
                                "imagen": "canada/becas_canada.jpg",
                                "titulo": "Bolsas e Subsídios",
                                "descripcion": "Existem inúmeras bolsas e subsídios disponíveis para estudantes internacionais, facilitando o acesso ao ensino superior."
                            },
                            {
                                "imagen": "canada/estudiantil_canada.jpeg",
                                "titulo": "Vida Estudantil",
                                "descripcion": "A vida estudantil no Canadá é vibrante e diversificada, com inúmeras atividades extracurriculares e oportunidades sociais."
                            }
                        ]
                    },
                    {
                        "titulo": "Qualidade de Vida e Segurança",
                        "descripcion": "O Canadá é conhecido pela sua alta qualidade de vida, com um sistema de saúde robusto e um ambiente seguro para seus residentes.",
                        "tarjetas": [
                            {
                                "imagen": "canada/salud_canada.jpg",
                                "titulo": "Sistema de Saúde",
                                "descripcion": "O sistema de saúde canadense é um dos melhores do mundo, fornecendo acesso a cuidados médicos universais."
                            },
                            {
                                "imagen": "canada/seguridad_canada.jpg",
                                "titulo": "Segurança",
                                "descripcion": "O Canadá é um dos países mais seguros do mundo, com baixos índices de criminalidade e um ambiente pacífico."
                            },
                            {
                                "imagen": "canada/costo_canada.jpg",
                                "titulo": "Custo de Vida",
                                "descripcion": "Embora o custo de vida possa variar, o Canadá oferece um bom equilíbrio entre qualidade de vida e despesas econômicas."
                            }
                        ]
                    },
                    {
                        "titulo": "Beleza Natural e Turismo",
                        "descripcion": "O Canadá é famoso pela sua beleza natural, desde as Montanhas Rochosas até os Grandes Lagos e parques nacionais.",
                        "tarjetas": [
                            {
                                "imagen": "canada/rocosas_canada.jpg",
                                "titulo": "Montanhas Rochosas",
                                "descripcion": "Um destino popular para caminhadas, esqui e outras atividades ao ar livre."
                            },
                            {
                                "imagen": "canada/cataratas_canada.jpg",
                                "titulo": "Cataratas do Niágara",
                                "descripcion": "Uma das maravilhas naturais mais famosas do mundo, conhecida pela sua impressionante queda d'água."
                            },
                            {
                                "imagen": "canada/parque_canada.jpg",
                                "titulo": "Parques Nacionais",
                                "descripcion": "O Canadá possui numerosos parques nacionais oferecendo vistas impressionantes e atividades recreativas."
                            }
                        ]
                    },
                    {
                        "titulo": "Oportunidades de Trabalho e Imigração",
                        "descripcion": "O Canadá oferece múltiplas oportunidades de trabalho e imigração para profissionais qualificados e empreendedores.",
                        "tarjetas": [
                            {
                                "imagen": "canada/laboral_canada.jpeg",
                                "titulo": "Oportunidades de Trabalho",
                                "descripcion": "O mercado de trabalho canadense é dinâmico e em crescimento, com uma demanda significativa em diversos setores."
                            },
                            {
                                "imagen": "canada/inmigracion_canada.png",
                                "titulo": "Programas de Imigração",
                                "descripcion": "O Canadá possui vários programas de imigração que facilitam a residência permanente para trabalhadores qualificados e empreendedores."
                            },
                            {
                                "imagen": "canada/emprendedores_canada.png",
                                "titulo": "Visto para Empreendedores",
                                "descripcion": "O programa de visto para empreendedores apoia aqueles que desejam iniciar um negócio no Canadá."
                            }
                        ]
                    },
                    {
                        "titulo": "Diversidade e Multiculturalismo",
                        "descripcion": [
                            "O Canadá é conhecido pela sua política de multiculturalismo e seu compromisso com a diversidade.",
                            "O país celebra uma ampla variedade de culturas e etnias, enriquecendo sua sociedade e promovendo a inclusão."
                        ]
                    },
                    {
                        "titulo": "Requisitos de Visto 2024",
                        "descripcion": "Antes de viajar para o Canadá, certifique-se de cumprir todos os requisitos de visto e documentação necessária para a sua viagem.",
                        "lista": [
                            "Passaporte válido por pelo menos 6 meses.",
                            "Prova de fundos suficientes para a sua estadia.",
                            "Carta de convite, se aplicável.",
                            "Formulário de solicitação de visto completo.",
                            "Fotos recentes."
                        ]
                    },
                    {
                        "titulo": "Necessidade de Obter um Visto",
                        "descripcion": [
                            "Para entrar no Canadá, cidadãos da maioria dos países latino-americanos precisam obter um visto. Esse processo envolve:",
                            "• Solicitação e Documentação: Os solicitantes devem apresentar uma solicitação formal, demonstrar sua intenção de retornar ao país de origem e fornecer documentação de apoio.",
                            "• Entrevista Consular: Em alguns casos, uma entrevista no consulado canadense é necessária.",
                            "• Prova de Fundos: Os solicitantes devem demonstrar que possuem fundos suficientes para cobrir a estadia no Canadá."
                        ],
                        "subsecciones": [
                            {
                                "titulo": "Tipos de Vistos Canadenses",
                                "items": [
                                    { "text": "1. Visto de Visitante (Temporary Resident Visa - TRV)" },
                                    { "text": "2. Visto de Estudo" },
                                    { "text": "3. Visto de Trabalho" },
                                    { "text": "4. Super Visto para Pais e Avós" },
                                    { "text": "5. Permissão de Residência Permanente" }
                                ]
                            },
                            {
                                "titulo": "Requisitos Gerais",
                                "items": [
                                    {
                                        "text": "1. Formulário de Solicitação Completo: Dependendo do tipo de visto, o formulário apropriado deve ser preenchido.",
                                        "subitems": [
                                            { "title": "Para um visto de visitante:", "text": "Formulário IMM 5257." },
                                            { "title": "Para um visto de estudo:", "text": "Formulário IMM 1294." },
                                            { "title": "Para um visto de trabalho:", "text": "Formulário IMM 1295." }
                                        ]
                                    },
                                    { "text": "2. Passaporte Válido: Deve ser válido para a duração da estadia no Canadá." },
                                    { "text": "3. Fotos: Duas fotos recentes de acordo com as especificações fornecidas pelo governo canadense." },
                                    { "text": "4. Prova de Fundos: Demonstrar que se possui recursos financeiros suficientes para cobrir a estadia no Canadá." },
                                    { "text": "5. Carta de Convite: Se aplicável, especialmente para vistos de visitante." },
                                    { "text": "6. Prova de Vínculos com o País de Origem: Documentação que comprove a intenção de retornar ao país de origem, como emprego, propriedades ou laços familiares." },
                                    { "text": "7. Histórico de Viagens: Detalhes sobre viagens anteriores, se houver." },
                                    { "text": "8. Pagamento de Taxas de Solicitação: Varia conforme o tipo de visto, geralmente entre $100 a $150 CAD para vistos de visitante." }
                                ]
                            },
                            {
                                "titulo": "Procedimento de Solicitação",
                                "items": [
                                    { "text": "1. Reunir a Documentação Necessária: Garantir que todos os documentos exigidos estejam em ordem." },
                                    { "text": "2. Preencher o Formulário de Solicitação: Dependendo do tipo de visto, preencher o formulário apropriado." },
                                    { "text": "3. Pagamento das Taxas: Realizar o pagamento da taxa de solicitação e obter o recibo." },
                                    { "text": "4. Enviar a Solicitação: Submeter a solicitação online através do site do governo canadense ou em papel para um Centro de Solicitação de Vistos (VAC)." },
                                    { "text": "5. Biometria: Em alguns casos, serão necessários dados biométricos (impressões digitais e foto)." },
                                    { "text": "6. Entrevista (se aplicável): Algumas solicitações podem exigir uma entrevista no consulado canadense." },
                                    { "text": "7. Aguardar Decisão: Os prazos de processamento variam conforme o tipo de visto e o escritório de vistos, mas geralmente levam de duas semanas a vários meses." },
                                    { "text": "8. Receber o Visto: Se a solicitação for aprovada, um visto será emitido no passaporte do solicitante." }
                                ]
                            },
                            {
                                "titulo": "Dicas Adicionais",
                                "items": [
                                    { "text": "• Documentação Adicional: Dependendo do tipo de visto e das circunstâncias pessoais, podem ser exigidos documentos adicionais, como certificados médicos, cartas de aceitação de instituições educacionais ou ofertas de emprego." },
                                    { "text": "• Consultas: É aconselhável consultar um advogado de imigração ou consultor de imigração autorizado para garantir que a solicitação seja tratada corretamente." },
                                    { "text": "• Verificar Requisitos Específicos: Os requisitos podem variar ligeiramente dependendo do país de origem e das circunstâncias pessoais." }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        "australia": {
            "first_section": {
                "introduccion": "A maioria dos viajantes precisa de um visto para entrar na Austrália. Abaixo estão os requisitos de visto para diferentes regiões do mundo.",
                "secciones": [
                    {
                        "titulo": "América do Norte",
                        "descripcion": "Viajantes da América do Norte precisam de um visto para entrar na Austrália.",
                        "lista": [
                            "Canadá: Visto necessário (Autorização Eletrônica de Viagem - ETA)",
                            "Estados Unidos: Visto necessário (Autorização Eletrônica de Viagem - ETA)",
                            "México: Visto necessário"
                        ],
                        "isSingleColumn": true
                    },
                    {
                        "titulo": "América Central e Caribe",
                        "descripcion": "Todos os países da América Central e do Caribe precisam de um visto para entrar na Austrália.",
                        "lista": [
                            "Antígua e Barbuda",
                            "Bahamas",
                            "Barbados",
                            "Belize",
                            "Costa Rica",
                            "Cuba",
                            "Dominica",
                            "República Dominicana",
                            "El Salvador",
                            "Granada",
                            "Guatemala",
                            "Haiti",
                            "Honduras",
                            "Jamaica",
                            "Nicaragua",
                            "Panamá",
                            "São Cristóvão e Nevis",
                            "Santa Lúcia",
                            "São Vicente e Granadinas",
                            "Trinidad e Tobago"
                        ]
                    },
                    {
                        "titulo": "América do Sul",
                        "descripcion": "Todos os países da América do Sul precisam de um visto para entrar na Austrália.",
                        "lista": [
                            "Argentina",
                            "Bolívia",
                            "Brasil",
                            "Chile",
                            "Colômbia",
                            "Equador",
                            "Guiana",
                            "Paraguai",
                            "Peru",
                            "Suriname",
                            "Uruguai",
                            "Venezuela"
                        ]
                    },
                    {
                        "titulo": "Europa",
                        "descripcion": "Cidadãos de muitos países europeus podem solicitar o visto eVisitor para entrar na Austrália.",
                        "lista": [
                            "Andorra",
                            "Áustria",
                            "Bélgica",
                            "Bulgária",
                            "Croácia",
                            "Chipre",
                            "República Tcheca",
                            "Dinamarca",
                            "Estônia",
                            "Finlândia",
                            "França",
                            "Alemanha",
                            "Grécia",
                            "Hungria",
                            "Islândia",
                            "Irlanda",
                            "Itália",
                            "Letônia",
                            "Liechtenstein",
                            "Lituânia",
                            "Luxemburgo",
                            "Malta",
                            "Mônaco",
                            "Países Baixos",
                            "Noruega",
                            "Polônia",
                            "Portugal",
                            "Romênia",
                            "San Marino",
                            "Eslováquia",
                            "Eslovênia",
                            "Espanha",
                            "Suécia",
                            "Suíça",
                            "Reino Unido (Cidadão Britânico)",
                            "Vaticano"
                        ]
                    },
                    {
                        "titulo": "Oceania",
                        "descripcion": "A maioria dos países na Oceania precisa de visto, exceto os cidadãos da Nova Zelândia.",
                        "lista": [
                            "Fiji",
                            "Kiribati",
                            "Ilhas Marshall",
                            "Micronésia",
                            "Nauru",
                            "Palau",
                            "Papua-Nova Guiné",
                            "Samoa",
                            "Ilhas Salomão",
                            "Tonga",
                            "Tuvalu",
                            "Vanuatu"
                        ]
                    },
                    {
                        "titulo": "Oriente Médio",
                        "descripcion": "Todos os países do Oriente Médio precisam de um visto para entrar na Austrália.",
                        "lista": [
                            "Bahrein",
                            "Irã",
                            "Iraque",
                            "Israel",
                            "Jordânia",
                            "Kuwait",
                            "Líbano",
                            "Omã",
                            "Catar",
                            "Arábia Saudita",
                            "Síria",
                            "Emirados Árabes Unidos",
                            "Iémen"
                        ]
                    }
                ],
                "resumen": "Para obter mais informações detalhadas e solicitar um visto, os viajantes devem consultar o site do Departamento de Assuntos Internos do Governo da Austrália. Este site fornece detalhes completos sobre os tipos de vistos disponíveis, os critérios de elegibilidade e o processo de solicitação."
            }
        },
        "englad": {
            "first_section": {
                "introduccion": "A seguir, é apresentado uma lista dos países cujos cidadãos precisam de visto para entrar no Reino Unido:",
                "secciones": [
                    {
                        "titulo": "África",
                        "descripcion": "Todos os países na África precisam de visto para entrar no Reino Unido.",
                        "lista": [
                            "Argélia",
                            "Angola",
                            "Benin",
                            "Botswana",
                            "Burkina Faso",
                            "Burundi",
                            "Cabo Verde",
                            "Camarões",
                            "República Centro-Africana",
                            "Chade",
                            "Comores",
                            "Congo (República)",
                            "Congo (República Democrática)",
                            "Costa do Marfim",
                            "Djibuti",
                            "Egito",
                            "Guiné Equatorial",
                            "Eritreia",
                            "Etiópia",
                            "Gabão",
                            "Gâmbia",
                            "Gana",
                            "Guiné",
                            "Guiné-Bissau",
                            "Quênia",
                            "Lesoto",
                            "Libéria",
                            "Líbia",
                            "Madagascar",
                            "Malawi",
                            "Mali",
                            "Mauritânia",
                            "Moçambique",
                            "Namíbia",
                            "Níger",
                            "Nigéria",
                            "Ruanda",
                            "São Tomé e Príncipe",
                            "Senegal",
                            "Serra Leoa",
                            "Somália",
                            "Sudão",
                            "Sudão do Sul",
                            "Suazilândia",
                            "Tanzânia",
                            "Togo",
                            "Tunísia",
                            "Uganda",
                            "Zâmbia",
                            "Zimbábue"
                        ]
                    },
                    {
                        "titulo": "Ásia",
                        "descripcion": "Todos os países na Ásia precisam de visto para entrar no Reino Unido.",
                        "lista": [
                            "Afeganistão",
                            "Armênia",
                            "Azerbaijão",
                            "Bahrein",
                            "Bangladesh",
                            "Butão",
                            "Brunei",
                            "Camboja",
                            "China",
                            "Geórgia",
                            "Índia",
                            "Indonésia",
                            "Irã",
                            "Iraque",
                            "Jordânia",
                            "Cazaquistão",
                            "Coreia do Norte",
                            "Kuwait",
                            "Quirguistão",
                            "Laos",
                            "Líbano",
                            "Malásia",
                            "Maldivas",
                            "Mongólia",
                            "Myanmar (Birmânia)",
                            "Nepal",
                            "Omã",
                            "Paquistão",
                            "Palestina",
                            "Filipinas",
                            "Catar",
                            "Rússia",
                            "Arábia Saudita",
                            "Singapura",
                            "Sri Lanka",
                            "Síria",
                            "Tadjiquistão",
                            "Tailândia",
                            "Timor-Leste",
                            "Turquia",
                            "Turcomenistão",
                            "Emirados Árabes Unidos",
                            "Uzbequistão",
                            "Vietnã",
                            "Iémen"
                        ]
                    },
                    {
                        "titulo": "Europa",
                        "descripcion": "Alguns países na Europa precisam de visto para entrar no Reino Unido.",
                        "lista": [
                            "Albânia",
                            "Bielorrússia",
                            "Bósnia e Herzegovina",
                            "Kosovo",
                            "Macedônia do Norte",
                            "Moldávia",
                            "Montenegro",
                            "Sérvia",
                            "Ucrânia"
                        ]
                    },
                    {
                        "titulo": "América",
                        "descripcion": "Todos os países na América precisam de visto para entrar no Reino Unido.",
                        "lista": [
                            "Antígua e Barbuda",
                            "Argentina",
                            "Bahamas",
                            "Barbados",
                            "Belize",
                            "Bolívia",
                            "Brasil",
                            "Chile",
                            "Colômbia",
                            "Costa Rica",
                            "Cuba",
                            "Dominica",
                            "Equador",
                            "El Salvador",
                            "Granada",
                            "Guatemala",
                            "Guiana",
                            "Haiti",
                            "Honduras",
                            "Jamaica",
                            "México",
                            "Nicarágua",
                            "Panamá",
                            "Paraguai",
                            "Peru",
                            "República Dominicana",
                            "São Cristóvão e Nevis",
                            "Santa Lúcia",
                            "São Vicente e Granadinas",
                            "Suriname",
                            "Trinidad e Tobago",
                            "Uruguai",
                            "Venezuela"
                        ]
                    },
                    {
                        "titulo": "Oceania",
                        "descripcion": "A maioria dos países na Oceania precisa de visto, exceto os cidadãos da Austrália e da Nova Zelândia.",
                        "lista": [
                            "Fiji",
                            "Kiribati",
                            "Ilhas Marshall",
                            "Micronésia",
                            "Nauru",
                            "Palau",
                            "Papua-Nova Guiné",
                            "Samoa",
                            "Ilhas Salomão",
                            "Tonga",
                            "Tuvalu",
                            "Vanuatu"
                        ]
                    }
                ],
                "resumen": "Para obter mais informações detalhadas e solicitar um visto, os viajantes devem consultar o site do Governo do Reino Unido. Este site fornece detalhes completos sobre os tipos de vistos disponíveis, os critérios de elegibilidade e o processo de solicitação."
            },
            "second_section": {
                "titulo": "Requisitos Gerais",
                "descripcion": [
                    "1. Passaporte Válido: Seu passaporte deve ser válido durante todo o período da sua estadia no Reino Unido.",
                    "2. Formulário de Solicitação Completo: Você deve preencher o formulário de solicitação online disponível no site do governo do Reino Unido.",
                    "3. Foto Recente: Uma foto recente no formato de passaporte.",
                    "4. Prova de Recursos Financeiros: Você deve demonstrar que possui fundos suficientes para se sustentar durante sua estadia no Reino Unido sem precisar trabalhar ou acessar fundos públicos. Isso pode incluir extratos bancários, recibos de salário ou prova de outras fontes de renda.",
                    "5. Prova do Propósito da Visita: Documentação que comprove o propósito da sua visita, como uma carta de convite, itinerário de viagem, reservas de hotel, etc.",
                    "6. Prova de Vínculos com o País de Residência: Para mostrar que você tem razões para retornar ao seu país de origem após a visita. Isso pode incluir provas de emprego, estudos ou laços familiares.",
                    "7. Prova de Residência e Estado Migratório no País de Origem: Se você não for cidadão do país de onde está aplicando, você precisará demonstrar seu status migratório naquele país."
                ]
            },
            "third_section": {
                "titulo": "Procedimento de Solicitação",
                "descripcion": [
                    "Preencher o Formulário de Solicitação Online: Acesse o sistema de solicitação de vistos do Reino Unido e preencha o formulário correspondente.",
                    "Pagar a Taxa de Solicitação: A taxa do visto de visitante varia dependendo da duração da estadia. Atualmente, a taxa padrão para um visto de turista de seis meses é de £100 (aproximadamente $130 USD).",
                    "Agendar uma Entrevista no Centro de Solicitação de Vistos: Após preencher o formulário e pagar a taxa, você deve agendar uma entrevista no centro de solicitação de vistos mais próximo para fornecer seus dados biométricos (impressões digitais e foto).",
                    "Apresentar Documentos de Suporte: Na sua entrevista, você deve levar todos os documentos de suporte necessários, incluindo seu passaporte, a confirmação da sua entrevista e qualquer outra documentação solicitada.",
                    "Entrevista (se aplicável): Em alguns casos, pode ser necessária uma entrevista para avaliar sua solicitação.",
                    "Aguardar a Decisão: Após apresentar sua solicitação e todos os documentos de suporte, você precisará aguardar a decisão. Os tempos de processamento podem variar, mas geralmente levam algumas semanas."
                ]
            },
            "fourth_section": {
                "titulo": "Informações Adicionais",
                "descripcion": [
                    "Evidências Adicionais: Dependendo da sua situação pessoal e da natureza da sua visita, pode ser necessário fornecer evidências adicionais.",
                    "Visto para Visitar Familiares ou Amigos: Se você estiver visitando familiares ou amigos, uma carta de convite pode ser útil.",
                    "Viagens de Negócios: Para viagens de negócios, você deverá fornecer uma carta do seu empregador e um convite da empresa no Reino Unido."
                ]
            },
            "footer": {
                "fuentes": [
                    "GOV.UK - Apply for a UK visa",
                    "GOV.UK - Standard Visitor visa"
                ]
            }
        },
        "india": {
            "first_section": {
                "introduccion": "Para entrar na Índia, a maioria dos visitantes precisa obter um visto, seja antes da chegada ou por meio de um sistema de visto eletrônico (e-Visa). Cidadãos de todos os países, exceto Butão e Nepal, precisam de um visto para entrar na Índia. Aqui está um resumo dos requisitos de acordo com o tipo de visto e o país de origem:",
                "secciones": [
                    {
                        "titulo": "Visto na chegada ou e-Visa",
                        "descripcion": "A Índia oferece vistos eletrônicos (e-Visas) para cidadãos de muitos países. Os visitantes podem solicitar um e-Visa online antes da viagem e receber a aprovação por e-mail, o que lhes permite entrar no país através de certos aeroportos e portos marítimos."
                    },
                    {
                        "titulo": "Visto prévio à chegada",
                        "descripcion": "Alguns visitantes devem obter um visto antes da chegada, solicitando-o em uma missão diplomática indiana em seu país de origem."
                    },
                    {
                        "titulo": "Isenções de visto",
                        "descripcion": "Butão e Nepal: Cidadãos desses dois países não precisam de visto para entrar na Índia. Além disso, podem viver e trabalhar na Índia sem limite de tempo.\nMaldivas: Cidadãos das Maldivas não precisam de visto para visitas de até 90 dias."
                    }
                ]
            },
            "second_section": {
                "titulo": "Procedimento para a Solicitação de Visto para a Índia",
                "descripcion": [
                    "Determinar o Tipo de Visto: Dependendo do propósito da visita (turismo, negócios, estudos, etc.), é importante selecionar o tipo adequado de visto. Os mais comuns são o visto de turista, o visto de negócios e o visto de estudante.",
                    "Solicitação de Visto Eletrônico (e-Visa):",
                    "e-Visa: Para estadias curtas (turismo, negócios ou tratamento médico), o e-Visa é uma opção conveniente. Pode ser solicitado online sem necessidade de visitar uma embaixada ou consulado.",
                    "Visite o site oficial do e-Visa: [Indian e-Visa](https://indianvisaonline.gov.in/).",
                    "Preencha o formulário online com informações pessoais, do passaporte e da viagem.",
                    "Envie uma foto recente e uma cópia digitalizada do passaporte (página com dados pessoais).",
                    "Pague a taxa do visto online por meio de cartão de crédito/débito.",
                    "Visto Regular através da Embaixada:",
                    "Se o e-Visa não for adequado para o propósito da viagem ou a duração da estadia, deve-se solicitar um visto regular na embaixada ou consulado indiano.",
                    "Processo:",
                    "Visite o site da embaixada indiana mais próxima para obter o formulário de solicitação e a lista de requisitos: [Embaixada da Índia no México](https://www.indiainmexico.gov.in/).",
                    "Preencha o formulário de solicitação.",
                    "Reúna os documentos necessários (veja a lista de requisitos abaixo).",
                    "Apresente a solicitação e pague a taxa correspondente na embaixada ou consulado."
                ]
            },
            "third_section": {
                "titulo": "Requisitos para a Solicitação de Visto",
                "descripcion": [
                    "Formulário de Solicitação: Preencha o formulário de solicitação online ou físico conforme o tipo de visto (e-Visa ou visto regular).",
                    "Passaporte: Passaporte válido com pelo menos seis meses de validade restante a partir da data de chegada à Índia e pelo menos duas páginas em branco.",
                    "Foto Recente: Foto recente com fundo branco.",
                    "Prova de Viagem: Cópia do bilhete de avião de ida e volta ou itinerário de viagem.",
                    "Comprovante de Recursos Financeiros: Extratos bancários recentes ou cartas de patrocínio.",
                    "Documentos Adicionais: Dependendo do tipo de visto, podem ser necessários documentos adicionais como cartas de convite (para visto de negócios), comprovante de matrícula (para visto de estudante), etc.",
                    "Pagamento da Taxa: Pagar a taxa do visto, que varia conforme o tipo de visto e a duração da estadia."
                ]
            },
            "fourth_section": {
                "titulo": "Dicas Adicionais",
                "descripcion": [
                    "Tempo de Processamento: O e-Visa geralmente é processado em alguns dias, enquanto os vistos regulares podem levar mais tempo, portanto, recomenda-se aplicar com antecedência.",
                    "Verificar Informações: Consulte a página oficial da embaixada ou consulado para obter as informações mais atualizadas e detalhadas sobre o processo e os requisitos."
                ]
            },
            "footer": {
                "fuentes": [
                    "Para mais detalhes e para iniciar o processo de solicitação, você pode visitar o site oficial do e-Visa da Índia e o site da embaixada da Índia acreditada a El Salvador.",
                    {
                        "texto": "Embaixada da Índia",
                        "url": "https://www.indiainmexico.gov.in/"
                    }
                ]
            }
        },
        "guide_section": {
            "header": "Consiga nosso guia completo para obter seu visto americano",
            "description": "Bem-vindo a uma jornada de descoberta pessoal e oportunidade transformadora. Este guia não é apenas um manual, mas um companheiro estratégico projetado para todos aqueles que sonham em cruzar fronteiras para novas possibilidades nos Estados Unidos. Aqui, você aprenderá como sua história, habilidades e trajetória podem se tornar seus maiores ativos nesta jornada. Com uma abordagem personalizada e exemplos práticos, este guia oferece o conhecimento e as ferramentas necessárias para maximizar suas chances de sucesso ao apresentar seu caso aos consulados americanos. Prepare-se para se empoderar com informações que permitirão tomar decisões informadas e estratégicas, e comece seu caminho para um futuro mais brilhante.",
            "popupWithoutLogin": {
                "title": "Acesso Negado",
                "description": "Para baixar ou visualizar o PDF, você precisa estar autenticado.",
                "button": "Aceitar"
            },
            "downloadPdfButton": "Baixar PDF",
            "viewPdfButton": "Ver PDF",
            "pdfPath": "./A9bC3dE4FgH5IjK6LmN7oP8QrS9TuV0WxY1Za2Bc3Dd4Ef5Gh6Ij7Kl8Mn9Op0Qr1St2Uv3Wx4Yz5A6B7C8D9E0F1G2H3I4J5K6L.pdf"
        },
        "guide": {
            "button": "Adquirir o guia completo"
        }
    }
];

export default portuguese;
