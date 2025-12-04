CREATE DATABASE appetitedb;

\c appetitedb;

-- Tabela: categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Tabela: receitas
CREATE TABLE receitas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  ingredientes TEXT,
  modo_preparo TEXT,
  imagem TEXT,
  favorita BOOLEAN DEFAULT FALSE,
  avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5),  -- Avaliação de 1 a 5
  tempo_preparo INTEGER,  -- Tempo de preparo em minutos
  dificuldade VARCHAR(30) CHECK (dificuldade IN ('FACIL', 'MEDIO', 'DIFICIL')) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,  
  UNIQUE (titulo)  -- Garantir que o título da receita seja único
);

CREATE TABLE receita_categorias (
  receita_id INTEGER REFERENCES receitas(id) ON DELETE CASCADE,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (receita_id, categoria_id)
);

INSERT INTO categorias (nome) VALUES 
('Sobremesas'),
('Massas'),
('Carnes'),
('Vegetariano'),
('Lanches'),
('Bebidas'),
('Sopas');

INSERT INTO receitas (titulo, descricao, ingredientes, modo_preparo, imagem, favorita, avaliacao, tempo_preparo, dificuldade, categoria_id) VALUES 
('Bolo de Cenoura', 'Bolo tradicional brasileiro, macio e úmido, com uma deliciosa cobertura de chocolate que derrete na boca. Perfeito para o café da tarde.', '3 cenouras médias, 3 ovos, 1 xícara de óleo, 2 xícaras de açúcar, 2 xícaras de farinha de trigo, 1 colher de sopa de fermento em pó, 1 lata de leite condensado, 4 colheres de sopa de chocolate em pó', 'Descasque e pique as cenouras. Bata no liquidificador as cenouras, ovos e óleo até ficar homogêneo. Em uma tigela, misture o açúcar, farinha e fermento. Adicione a mistura do liquidificador e mexa bem. Despeje em forma untada e asse a 180°C por 40 minutos. Para a cobertura, misture leite condensado com chocolate em pó e cozinhe até engrossar. Espalhe sobre o bolo morno.', 'bolo_cenoura.jpg', TRUE, 5, 60, 'FACIL', 1),

('Pudim de Leite', 'Sobremesa clássica cremosa com caramelo dourado. Uma receita tradicional que nunca sai de moda e encanta qualquer mesa.', '1 lata de leite condensado, 1 lata de leite, 3 ovos, 1 xícara de açúcar para caramelo', 'Faça o caramelo derretendo o açúcar em uma panela até dourar. Despeje numa forma de pudim e gire para cobrir o fundo. No liquidificador, bata leite condensado, leite e ovos. Despeje sobre o caramelo. Asse em banho-maria a 180°C por 1 hora. Deixe esfriar, geladeira por 4 horas e desenforme passando uma faca nas bordas.', 'pudim.jpg', TRUE, 5, 90, 'MEDIO', 1),

('Brigadeiro', 'Doce brasileiro mais famoso, feito com leite condensado e chocolate. Irresistível e perfeito para festas e comemorações.', '1 lata de leite condensado, 3 colheres de sopa de chocolate em pó, 1 colher de sopa de manteiga, chocolate granulado para decorar', 'Em uma panela, misture leite condensado, chocolate em pó e manteiga. Cozinhe em fogo baixo, mexendo sempre, até desgrudar do fundo da panela (cerca de 15 minutos). Deixe esfriar, faça bolinhas com as mãos untadas com manteiga e passe no chocolate granulado. Coloque em forminhas de papel.', 'brigadeiro.jpg', TRUE, 5, 30, 'FACIL', 1),

('Macarrão à Carbonara', 'Prato italiano clássico e elegante, com molho cremoso feito com ovos, queijo e bacon. Simplicidade e sabor em cada garfada.', '400g de espaguete, 200g de bacon, 4 gemas de ovos, 1 xícara de queijo parmesão ralado, sal e pimenta-do-reino a gosto', 'Cozinhe o macarrão em água salgada até ficar al dente. Frite o bacon até ficar crocante. Em uma tigela, misture gemas com parmesão. Escorra o macarrão reservando 1 xícara da água do cozimento. Misture o macarrão quente com bacon, retire do fogo e adicione a mistura de ovos, mexendo rapidamente. Adicione água do cozimento se necessário. Tempere e sirva.', 'carbonara.jpg', FALSE, 4, 25, 'FACIL', 2),

('Lasanha à Bolonhesa', 'Lasanha tradicional com molho bolonhesa rico e saboroso, intercalada com queijos cremosos. Perfeita para reunir a família.', '500g de massa de lasanha, 500g de carne moída, 2 latas de molho de tomate, 500g de muçarela, 200g de presunto, molho branco, queijo parmesão', 'Prepare o molho refogando a carne com cebola e alho, adicione molho de tomate e temperos. Cozinhe a massa. Faça camadas alternando massa, molho bolonhesa, presunto, muçarela e molho branco. Repita as camadas, finalize com queijo parmesão e asse a 200°C por 30 minutos até dourar.', 'lasanha.jpg', TRUE, 5, 90, 'MEDIO', 2),

('Nhoque de Batata', 'Massa italiana macia e saborosa, feita com batatas frescas. Acompanha perfeitamente molhos variados.', '1kg de batatas, 2 ovos, 300g de farinha de trigo, sal a gosto, molho de tomate para acompanhar', 'Cozinhe as batatas com casca até ficarem macias. Descasque e amasse ainda quentes. Misture com ovos, sal e farinha aos poucos até formar uma massa lisa. Faça rolinhos e corte pedaços pequenos. Passe os nhoques pelo garfo para fazer risquinhos. Cozinhe em água fervente até subirem à superfície. Sirva com molho de sua preferência.', 'nhoque.jpg', FALSE, 4, 60, 'MEDIO', 2),

('Bife à Parmegiana', 'Clássico bife empanado coberto com molho de tomate e queijo gratinado. Um prato que agrada toda a família.', '4 bifes de alcatra, 2 ovos batidos, farinha de rosca, molho de tomate, muçarela fatiada, presunto, queijo parmesão', 'Bata os bifes para amaciá-los. Tempere com sal e pimenta. Passe na farinha, depois no ovo e na farinha de rosca. Frite até dourar. Em um refratário, coloque os bifes, cubra com molho de tomate, presunto, muçarela e parmesão. Leve ao forno até o queijo derreter e dourar.', 'parmegiana.jpg', TRUE, 5, 45, 'MEDIO', 3),

('Frango Assado', 'Frango inteiro temperado com ervas e especiarias, assado até ficar dourado e suculento por fora, macio por dentro.', '1 frango inteiro, alho, limão, sal, pimenta, tomilho, alecrim, azeite, batatas para acompanhar', 'Limpe o frango e faça furos com uma faca. Prepare uma pasta com alho amassado, sal, pimenta, ervas e azeite. Esfregue bem o frango por dentro e por fora. Deixe marinar por 2 horas. Asse a 200°C por 1 hora, regando com o próprio caldo. Sirva com batatas assadas.', 'frango_assado.jpg', TRUE, 5, 120, 'MEDIO', 3),

('Feijoada', 'Prato típico brasileiro, feito com feijão preto e carnes variadas. Tradição e sabor que representa nossa cultura culinária.', '500g de feijão preto, 300g de carne seca, 200g de linguiça calabresa, 200g de costelinha de porco, temperos variados', 'Deixe o feijão de molho overnight. Cozinhe as carnes separadamente. Refogue cebola, alho e temperos, adicione o feijão escorrido e as carnes. Cubra com água e cozinhe por 2 horas em fogo baixo, mexendo ocasionalmente. Sirva com arroz, couve refogada, laranja e farofa.', 'feijoada.jpg', FALSE, 5, 180, 'DIFICIL', 3),

('Salada Caesar', 'Salada clássica americana com alface crocante, croutons dourados e molho cremoso especial. Refrescante e saborosa.', 'Alface americana, croutons, queijo parmesão, molho caesar, anchovas (opcional)', 'Lave e pique a alface em pedaços grandes. Prepare croutons tostando cubos de pão com azeite e alho. Misture a alface com o molho caesar, adicione croutons e queijo parmesão lascado. Finalize com anchovas se desejar. Sirva imediatamente para manter a crocância.', 'salada_caesar.jpg', FALSE, 4, 15, 'FACIL', 4),

('Quiche de Legumes', 'Torta francesa salgada com base crocante e recheio cremoso de legumes. Perfeita para almoços leves e nutritivos.', 'Massa quebrada, ovos, creme de leite, queijo, abobrinha, tomate, cebola, temperos', 'Prepare a massa e forre uma forma. Refogue os legumes picados. Misture ovos, creme de leite e queijo. Combine com os legumes refogados, tempere e despeje sobre a massa. Asse a 180°C por 35 minutos até dourar. Deixe esfriar um pouco antes de desenformar e servir.', 'quiche.jpg', TRUE, 4, 50, 'MEDIO', 4),

('Hambúrguer Artesanal', 'Hambúrguer caseiro com carne suculenta e ingredientes frescos. Muito mais saboroso que os industrializados.', 'Carne moída, pão de hambúrguer, alface, tomate, cebola, queijo, molhos especiais', 'Tempere a carne moída e faça hamburguers do tamanho desejado. Grelhe por 3-4 minutos de cada lado. Torre levemente o pão. Monte o hambúrguer com alface, tomate, cebola, hambúrguer, queijo e molhos. Sirva acompanhado de batatas fritas.', 'hamburguer.jpg', TRUE, 5, 25, 'FACIL', 5),

('Coxinha', 'Salgado brasileiro tradicional com massa macia e recheio de frango temperado. Perfeita para festas e lanches.', 'Frango desfiado, massa de mandioca, temperos, farinha de rosca, ovos para empanar', 'Cozinhe e desfie o frango, tempere bem. Prepare a massa cozinhando água com temperos e adicionando farinha aos poucos até formar uma massa lisa. Modele as coxinhas com o recheio, passe no ovo e farinha de rosca. Frite em óleo quente até dourar. Escorra em papel absorvente.', 'coxinha.jpg', TRUE, 5, 60, 'MEDIO', 5),

('Pastel de Carne', 'Pastel crocante com recheio saboroso de carne temperada. Clássico da culinária brasileira.', 'Massa de pastel, carne moída, cebola, temperos, óleo para fritar', 'Refogue a carne moída com cebola e temperos até secar. Abra a massa, coloque o recheio, feche bem as bordas com garfo. Frite em óleo bem quente até dourar dos dois lados. Escorra e sirva quente, acompanhado de molho de pimenta.', 'pastel.jpg', FALSE, 4, 40, 'MEDIO', 5),

('Suco Detox', 'Bebida saudável e refrescante, rica em vitaminas e minerais. Ideal para quem busca uma alimentação equilibrada.', 'Couve, maçã, limão, gengibre, água de coco', 'Lave bem todos os ingredientes. Bata no liquidificador a couve, maçã picada, suco de limão, gengibre e água de coco até ficar homogêneo. Coe se desejar uma textura mais lisa. Sirva gelado, preferencialmente logo após o preparo para manter as propriedades nutricionais.', 'suco_detox.jpg', FALSE, 4, 10, 'FACIL', 6),

('Vitamina de Banana', 'Bebida cremosa e nutritiva, perfeita para o café da manhã ou lanche da tarde. Rica em potássio e energia.', 'Bananas maduras, leite, mel, aveia (opcional)', 'Descasque as bananas e corte em rodelas. Bata no liquidificador com leite gelado e mel a gosto. Adicione aveia se desejar mais cremosidade e fibras. Bata até ficar homogêneo e cremoso. Sirva imediatamente em copos gelados.', 'vitamina_banana.jpg', TRUE, 5, 5, 'FACIL', 6),

('Caldo Verde', 'Sopa tradicional portuguesa, reconfortante e saborosa, perfeita para dias frios. Um clássico que aquece o coração.', 'Batatas, couve portuguesa, linguiça calabresa, cebola, alho, azeite, sal', 'Refogue cebola e alho no azeite. Adicione batatas picadas e água. Cozinhe até as batatas ficarem macias e amasse levemente. Adicione a couve cortada bem fininha e a linguiça em rodelas. Cozinhe por mais 5 minutos. Tempere e sirva quente com um fio de azeite por cima.', 'caldo_verde.jpg', TRUE, 5, 40, 'FACIL', 7),

('Sopa de Legumes', 'Sopa nutritiva e saudável com variedade de legumes frescos. Reconfortante e perfeita para uma alimentação equilibrada.', 'Cenoura, abobrinha, batata, chuchu, cebola, alho, temperos verdes', 'Refogue cebola e alho no azeite. Adicione todos os legumes picados e refogue por alguns minutos. Cubra com água, tempere e cozinhe até os legumes ficarem macios. Se desejar, bata parte da sopa no liquidificador para engrossar. Finalize com temperos verdes picados.', 'sopa_legumes.jpg', FALSE, 4, 35, 'FACIL', 7),

('Paella de Frutos do Mar', 'Prato espanhol tradicional com arroz temperado com açafrão e frutos do mar frescos. Sofisticado e cheio de sabor.', 'Arroz bomba, camarões, lulas, mexilhões, açafrão, tomate, pimentão, alho', 'Refogue alho, tomate e pimentão. Adicione o arroz e refogue. Acrescente caldo quente com açafrão aos poucos. Disponha os frutos do mar por cima sem mexer. Cozinhe em fogo baixo por 18 minutos. Deixe descansar antes de servir.', 'paella.jpg', FALSE, 5, 45, 'DIFICIL', 3),

('Risoto de Camarão', 'Risoto cremoso italiano com camarões suculentos. Prato elegante e sofisticado para ocasiões especiais.', 'Arroz arbóreo, camarões, caldo de peixe, vinho branco, cebola, queijo parmesão', 'Refogue cebola até transparente. Adicione o arroz e torre levemente. Acrescente vinho branco e deixe evaporar. Adicione caldo quente uma concha de cada vez, mexendo sempre. Nos últimos minutos, adicione camarões e queijo parmesão. Sirva imediatamente.', 'risoto_camarao.jpg', TRUE, 5, 40, 'MEDIO', 2),

('Strogonoff de Carne', 'Prato russo adaptado ao paladar brasileiro, cremoso e saboroso. Acompanha perfeitamente arroz e batata palha.', 'Filé mignon em tiras, champignons, creme de leite, molho de tomate, mostarda, conhaque', 'Doure a carne em panela quente. Reserve. Na mesma panela, refogue champignons. Adicione molho de tomate, mostarda e creme de leite. Retorne a carne, adicione conhaque e deixe apurar. Tempere e sirva com arroz branco e batata palha.', 'strogonoff.jpg', TRUE, 5, 30, 'FACIL', 3),

('Escondidinho de Carne Seca', 'Prato típico nordestino com purê de mandioca cremoso cobrindo carne seca saborosa. Conforto em cada colherada.', 'Carne seca, mandioca, queijo coalho, cebola, alho, leite, manteiga', 'Cozinhe e desfie a carne seca, refogue com cebola e alho. Cozinhe a mandioca, amasse com leite e manteiga até formar um purê. Em refratário, faça camadas de carne e purê, finalize com queijo. Asse até dourar por cima.', 'escondidinho.jpg', FALSE, 4, 60, 'MEDIO', 3),

('Moqueca de Peixe', 'Prato baiano tradicional com peixe cozido em leite de coco e dendê. Sabores intensos da culinária regional.', 'Peixe em postas, leite de coco, dendê, tomate, cebola, pimentão, coentro', 'Tempere o peixe e deixe marinar. Refogue cebola, tomate e pimentão. Adicione leite de coco e dendê, tempere. Coloque o peixe e cozinhe por 15 minutos sem mexer muito. Finalize com coentro. Sirva com arroz branco e pirão.', 'moqueca.jpg', FALSE, 5, 35, 'MEDIO', 3),

('Bobó de Camarão', 'Prato típico baiano cremoso feito com mandioca e camarões. Sabor único da culinária afro-brasileira.', 'Camarões, mandioca, leite de coco, dendê, cebola, alho, temperos', 'Cozinhe a mandioca e bata com leite de coco até formar um creme. Refogue camarões com temperos. Misture o creme de mandioca com camarões, adicione dendê e tempere. Cozinhe até encorpar. Sirva quente com arroz.', 'bobo_camarao.jpg', TRUE, 5, 45, 'MEDIO', 3),

('Mousse de Chocolate', 'Sobremesa francesa clássica, leve e aerada, com sabor intenso de chocolate. Elegante e irresistível.', 'Chocolate meio amargo, ovos, açúcar, creme de leite fresco', 'Derreta o chocolate em banho-maria. Separe claras e gemas. Bata as gemas com açúcar até clarear. Misture com chocolate morno. Bata claras em neve e creme de leite separadamente. Incorpore delicadamente ao chocolate. Leve à geladeira por 4 horas.', 'mousse_chocolate.jpg', TRUE, 5, 20, 'MEDIO', 1),

('Torta de Limão', 'Torta refrescante com base crocante e creme de limão azedinho. Perfeita para finalizar refeições pesadas.', 'Biscoito triturado, manteiga, leite condensado, suco de limão, creme de leite, gelatina incolor', 'Misture biscoito triturado com manteiga derretida, forre forma e leve ao freezer. Misture leite condensado, suco de limão e gelatina dissolvida. Adicione creme de leite batido. Despeje sobre a base e geladeira por 4 horas.', 'torta_limao.jpg', FALSE, 4, 30, 'FACIL', 1),

('Sorvete de Morango', 'Sorvete cremoso caseiro com morangos frescos. Sobremesa refrescante e natural para os dias quentes.', 'Morangos, açúcar, creme de leite, leite condensado', 'Bata morangos com açúcar até formar uma polpa. Misture com creme de leite e leite condensado. Despeje em forma e congele por 2 horas. Retire, bata novamente e congele até endurecer. Sirva em taças geladas.', 'sorvete_morango.jpg', TRUE, 5, 15, 'FACIL', 1),

('Pavê de Chocolate', 'Sobremesa em camadas com biscoitos e creme de chocolate. Clássica e sempre presente nas mesas brasileiras.', 'Biscoito champagne, leite, chocolate em pó, leite condensado, creme de leite, manteiga', 'Prepare um creme cozinhando leite condensado, chocolate e manteiga. Deixe esfriar e misture com creme de leite batido. Molhe biscoitos no leite e monte camadas alternando biscoito e creme. Finalize com chocolate ralado. Geladeira overnight.', 'pave_chocolate.jpg', TRUE, 5, 30, 'FACIL', 1),

('Banoffee Pie', 'Torta inglesa com base de biscoito, doce de leite, banana e chantilly. Combinação perfeita de sabores.', 'Biscoito triturado, manteiga, doce de leite, bananas, chantilly, chocolate para decorar', 'Misture biscoito com manteiga, forre forma e leve ao forno rapidamente. Espalhe doce de leite sobre a base fria, disponha fatias de banana. Cubra com chantilly e decore com chocolate ralado. Sirva gelada.', 'banoffee.jpg', FALSE, 4, 25, 'FACIL', 1),

('Açaí na Tigela', 'Sobremesa brasileira refrescante com açaí batido e acompanhamentos variados. Saudável e energético.', 'Polpa de açaí, banana, granola, mel, frutas variadas para decorar', 'Bata a polpa de açaí com banana até formar um creme roxo e espesso. Despeje em tigela e decore com granola, mel e frutas picadas como morango, banana e kiwi. Sirva imediatamente.', 'acai_tigela.jpg', TRUE, 5, 10, 'FACIL', 1),

('Caipirinha', 'Drink brasileiro mais famoso mundialmente, refrescante e com sabor marcante da cachaça com limão.', 'Cachaça, limão, açúcar, gelo', 'Corte o limão em pedaços pequenos. Em um copo, macere o limão com açúcar usando um socador. Adicione gelo e cachaça. Misture bem e sirva imediatamente. Decore com uma fatia de limão.', 'caipirinha.jpg', FALSE, 5, 5, 'FACIL', 6),

('Smoothie Verde', 'Bebida saudável com vegetais verdes e frutas. Rica em nutrientes e perfeita para começar o dia com energia.', 'Espinafre, banana, maçã verde, água de coco, hortelã', 'Lave bem o espinafre e hortelã. Bata todos os ingredientes no liquidificador até ficar homogêneo e cremoso. Se necessário, adicione mais água de coco. Sirva imediatamente em copos gelados.', 'smoothie_verde.jpg', FALSE, 4, 8, 'FACIL', 6),

('Mojito', 'Drink cubano refrescante com hortelã, limão e rum. Perfeito para dias quentes e momentos descontraídos.', 'Rum branco, hortelã fresca, limão, açúcar, água com gás, gelo', 'Em um copo, macere delicadamente as folhas de hortelã com açúcar e suco de limão. Adicione gelo, rum e complete com água com gás. Misture suavemente e decore com ramo de hortelã.', 'mojito.jpg', TRUE, 4, 7, 'FACIL', 6),

('Canja de Galinha', 'Sopa brasileira reconfortante, perfeita para quando se está doente ou precisando de carinho. Nutritiva e saborosa.', 'Galinha, arroz, cenoura, salsinha, cebola, alho', 'Cozinhe a galinha inteira até ficar macia. Retire, desfie e reserve o caldo. No caldo, cozinhe arroz e cenoura picada. Retorne o frango desfiado, tempere e finalize with salsinha. Sirva bem quente.', 'canja.jpg', TRUE, 5, 50, 'FACIL', 7),

('Sopa de Abóbora', 'Sopa cremosa e aveludada com sabor doce natural da abóbora. Reconfortante e nutritiva.', 'Abóbora cabotiá, cebola, gengibre, caldo de legumes, creme de leite, temperos', 'Refogue cebola e gengibre. Adicione abóbora em cubos e caldo de legumes. Cozinhe até amolecer. Bata no liquidificador até ficar cremoso. Volte à panela, adicione creme de leite e tempere. Sirva quente.', 'sopa_abobora.jpg', FALSE, 4, 30, 'FACIL', 7),

('Caldinho de Feijão', 'Aperitivo brasileiro servido em copinhos, perfeito para festas e encontros. Cremoso e cheio de sabor.', 'Feijão carioca, linguiça calabresa, bacon, temperos, farinha de mandioca', 'Cozinhe o feijão até ficar bem mole. Frite bacon e linguiça picados. Bata parte do feijão no liquidificador. Misture tudo, tempere e engrosse com farinha se necessário. Sirva quente em copinhos.', 'caldinho_feijao.jpg', TRUE, 5, 40, 'FACIL', 7),

('Gazpacho', 'Sopa fria espanhola com tomates frescos e vegetais. Refrescante e perfeita para dias quentes de verão.', 'Tomates maduros, pepino, pimentão, cebola, alho, azeite, vinagre, pão', 'Pique todos os vegetais. Molhe fatias de pão em água. Bata tudo no liquidificador com azeite e vinagre até ficar homogêneo. Tempere, coe se desejar e leve à geladeira. Sirva bem gelado.', 'gazpacho.jpg', FALSE, 4, 20, 'FACIL', 7),

('Tapioca Doce', 'Lanche brasileiro feito com goma de tapioca e recheios doces. Sem glúten e muito saborosa.', 'Goma de tapioca, leite condensado, coco ralado, queijo coalho', 'Hidrate a goma de tapioca até ficar úmida. Em frigideira antiaderente, espalhe a goma formando uma panqueca. Quando começar a grudar, adicione o recheio doce de um lado, dobre ao meio e sirva quente.', 'tapioca_doce.jpg', TRUE, 4, 10, 'FACIL', 5),

('Empadão de Frango', 'Torta salgada grande com massa crocante e recheio generoso de frango. Perfeita para almoços em família.', 'Farinha, manteiga, ovos, frango desfiado, palmito, ervilha, molho branco', 'Prepare a massa misturando farinha, manteiga e ovos. Forre uma forma grande. Misture frango desfiado com palmito, ervilha e molho branco. Recheie a torta, cubra com massa e asse até dourar.', 'empadao.jpg', FALSE, 4, 80, 'MEDIO', 5),

('Esfirra de Carne', 'Salgado árabe com massa macia e recheio temperado de carne. Tradição da culinária sírio-libanesa.', 'Farinha, fermento, carne moída, cebola, temperos árabes, azeite', 'Prepare a massa com farinha, fermento e água morna. Deixe crescer. Refogue carne moída com cebola e temperos árabes. Abra a massa, recheie e modele as esfirras. Asse até dourar.', 'esfirra.jpg', TRUE, 5, 70, 'MEDIO', 5),

('Quibe Frito', 'Salgado árabe crocante por fora e macio por dentro, com recheio de carne temperada. Muito popular no Brasil.', 'Trigo para quibe, carne moída, cebola, temperos árabes, hortelã', 'Hidrate o trigo para quibe. Misture com parte da carne e temperos para formar a massa. Refogue o restante da carne para o recheio. Modele os quibes, recheie e frite em óleo quente até dourar.', 'quibe.jpg', TRUE, 5, 60, 'MEDIO', 5),

('Wrap de Frango', 'Sanduíche enrolado em tortilha com frango grelhado e vegetais frescos. Opção saudável e prática.', 'Tortilha, peito de frango, alface, tomate, cenoura, molho iogurte', 'Grelhe o frango temperado até cozinhar completamente. Corte em tiras. Aqueça a tortilha, recheie com frango, vegetais frescos e molho. Enrole firmemente e corte ao meio para servir.', 'wrap_frango.jpg', FALSE, 4, 20, 'FACIL', 5),

('Café Gelado', 'Bebida refrescante com café forte e gelo, perfeita para dias quentes. Energizante e deliciosa.', 'Café forte, açúcar, gelo, leite (opcional)', 'Prepare um café forte e doce enquanto quente. Deixe esfriar completamente. Sirva em copos com bastante gelo. Adicione leite se desejar um café mais suave. Decore com canela em pó.', 'cafe_gelado.jpg', FALSE, 4, 15, 'FACIL', 6),

('Chá Gelado de Frutas', 'Bebida refrescante e saudável com chá e frutas naturais. Hidratante e cheia de sabor.', 'Chá preto, frutas vermelhas, limão, hortelã, mel', 'Prepare o chá e deixe esfriar. Adicione frutas vermelhas, fatias de limão e mel a gosto. Deixe na geladeira por 2 horas para as frutas soltarem sabor. Sirva com gelo e hortelã.', 'cha_gelado.jpg', TRUE, 4, 10, 'FACIL', 6),

('Vitamina de Abacate', 'Bebida cremosa brasileira doce feita com abacate. Rica e nutritiva, perfeita para lanches.', 'Abacate maduro, leite, açúcar, leite condensado (opcional)', 'Retire a polpa do abacate maduro. Bata no liquidificador com leite gelado e açúcar até ficar cremoso. Adicione leite condensado se desejar mais doce. Sirva imediatamente em copos gelados.', 'vitamina_abacate.jpg', TRUE, 5, 8, 'FACIL', 6),

('Biscoito de Polvilho', 'Biscoito brasileiro crocante e sem glúten, feito com polvilho. Perfeito para acompanhar café.', 'Polvilho doce, polvilho azedo, ovos, óleo, queijo ralado', 'Misture os polvilhos com ovos batidos, óleo quente e queijo. Amasse bem até formar uma massa lisa. Modele biscoitinhos pequenos e asse em forno pré-aquecido até dourar e ficar crocante.', 'biscoito_polvilho.jpg', FALSE, 4, 35, 'FACIL', 1);
