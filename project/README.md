# CGRA 2020/2021 - Group T02G08

| Name             | Number    | E-Mail               |
| ---------------- | --------- | -------------------- |
| Carlos Gomes     | 201906622 | up201906622@fe.up.pt |
| Henrique Nunes   | 201906852 | up201906852@fe.up.pt |


## Project Notes

- [x] 1 - Objeto conttrolável
- [x] 2 - Criação de objetos base
- [x] 3 - Controlos adicionais na interface
- [x] 4 - MyFish - Um peixe artificial
  - [x] 4.1 - Modelação do peixe
  - [x] 4.2 - Animação do peixe
- [x] 5 - Modelação de elementos da cena
  - [x] 5.1 - Fundo de areia com "ninho"
    - O ninho foi realizado aplicando uma textura a um paraboloide achatado (superficie de semiesfera com dupla face).
  - [x] 5.2 - Superfície de água
  - [x] 5.3 - Pedras (pilares, cubemap e outros elementos)
    - As pedras possuem formato, dimensões e posicionamento inicial variáveis e aleatórios entre si dentro de determinados limites.
    - Foram criados 4 pilares que são dispostos por baixo do pontão visível na superfície da água.
    - As algas encontram-se espalhadas pela cena, dispostas em grupos de 2 a 6 folhas.
- [x] 6 - Controlos e animações adicionais
  - [x] 6.1 - MyMovingFish -  Peixe controlado pelo teclado
  - [x] 6.2 - Ajuste das animações ao comportamento do peixe
  - [x] 6.3 - Recolha de pedras
    - Foi permitido ao peixe, quando tivesse uma pedra consigo, largar essa pedra em qualquer zona da cena e posteriormente voltar a recolhê-la, tornando assim o mundo mais realista. Quando a pedra é largadda no ninho então não é permitido ao peixe recolhê-la novamente.
- [x] 7 - Funcionalidades adicionais
  - [x] 7.1 - Algas
    - As algas são geradas com um número aleatório de folhas compreendido entre 2 e 6, possuem cores aleatórias (mesmo folhas da mesma alga) dentro de um conjunto de tons de verde, dimensões aleatórias dentro de determinados limites e posições aleatórias dentro da cena.
  - [ ] 7.2 - Algas animadas
  - [x] 7.3 - Colocação das pedras no alvo
    - A colocação das pedras no alvo é feita de forma natural, não sendo esta colocada em posições predefenidas. Fica colocada no ninho no local em que o interseta. Foi implementado um sistema de colisões que permite empilhar as pedras caso tenha alguma pedra por baixo no local da queda.
  - [x] 7.4 - Lançamento das pedras para o alvo
    - Foi implementado um lançamento da pedra com trajeória parabólica, tendo esta em conta a velocidade da pedra no momento em que foi largada acrescido de um impulso provocado pelo peixo, como se a atirasse e não apenas a deixasse cair e um fator de aceleração descendente que simula a gravidade (não foi tido em conta a resistência da água).
  - [x] 7.5 - MyAnimatedFish - Animação de outros peixes
    - Foram criados peixes autónomos, que se movimentam numa trajátoria circular, semelhantes ao peixe principal mas de cor diferente. Estes peixes possuem um centro de rotação aleatório dentro de determinados limites, tal como o sentido da sua rotação e a sua velocidade. A velocidade do peixe foi calculada com base numa velocidade angular que tem em conta um período de rotação aleatório entre aproximadamente 3 e 10 segundos (não foi possível calcular o período exato, pois, deduz-se, a função update do MyScene não é chamada exatamente no intervalo de tempo em que é pedidio na sua inicialização).
  - [x] 7.6 - Shader do peixe melhorado
    - O peixe possui uma textura das suas escamas e ainda reflete luz proveniente da cena.

É referido no enunciado que apenas devem ser avaliados 3 valores dos 6 possíveis na secção 7. Assim sendo,e uma vez que implementamos 4.5 dos 6 valores (7.1, 7.3, 7.4, 7.5, 7.6), desejariamos que fossem avaliadas as secções: ...

## Screenshots

### 4 - MyFish

![Fish Side](screenshots/proj-t2g8-1_3.png)
![Fish Front](screenshots/proj-t2g8-1_2.png)
![Fish Top](screenshots/proj-t2g8-1_1.png)
![Fish anim](screenshots/proj-t2g8-1.gif)

<br/><br/><br/>



### 5 - Modelação de elementos da cena

<br/>

#### 5.1  Ninho

![SeaFloor and Nest](screenshots/proj-t2g8-2.png)

<br/><br/>

#### 5.2  Superfície da água

![WaterSurface](screenshots/proj-t2g8-3.png)
![WaterSurface](screenshots/proj-t2g8-3.gif)

<br/><br/>

#### 5.3  Pedras

![Single Rock](screenshots/proj-t2g8-4_1.png)
![Multiple Rocks1](screenshots/proj-t2g8-4_2.png)
![Multiple Rocks2](screenshots/proj-t2g8-4_3.png)

<br/><br/>

#### 5.4  Pilares

![Pilars](screenshots/proj-t2g8-5.png)

<br/><br/>

#### 5.5  Outros elementos(Algas)

![SeaWeed](screenshots/proj-t2g8-6.png)

<br/><br/><br/>



### 6 - Controlos e animações adicionais

<br/>

#### 6.1 MyMovingFish - Peixe controlado pelo teclado
#### 6.2 Ajuste das animações ao comportamento do peixe

![MovingFish](screenshots/proj-t2g8-7_1.gif)

<br/><br/>

#### 6.3 Recolha de pedras

![Rocks Collection1](screenshots/proj-t2g8-7_31.png)
![Rocks Collection2](screenshots/proj-t2g8-7_32.png)
![Rocks Collection](screenshots/proj-t2g8-7_3.gif)

<br/><br/><br/>




### 7 - Funcionalidades Adicionais

<br/>

#### 7.1 - Algas

![SeaWeed Random](screenshots/proj-t2g8-8_1.png)

<br/>

#### 7.3 - Colocação das pedras no alvo

![Rocks in Nest](screenshots/proj-t2g8-8_3.png)

<br/>

#### 7.4 - Lançamento das pedras para o alvo

![Rocks Throw](screenshots/proj-t2g8-8_41.gif)
![Rocks Throw To Nest](screenshots/proj-t2g8-8_42.gif)

<br/>

#### 7.6 - Shader do peixe melhorado

![Improved Fish Shadow](screenshots/proj-t2g8-8_61.png)
![Improved Fish Bright](screenshots/proj-t2g8-8_62.png)




