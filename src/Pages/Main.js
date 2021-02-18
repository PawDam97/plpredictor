import React from 'react'
import '../Styles/Main.css';
import Oprojekcie from '..//Images/Oprojekcie.png'
import History from '../Images/dane.png'
import Now from '../Images/dane2.png'
import Prediction from '../Images/predykcja.png'
import Next from '../Images/next.png'
import More from '../Images/more.png'
import Wrapper from '../Config/Wrapper';
import Footer from '../Components/Footer';
class Main extends React.Component {

    render() {
        return (
            <Wrapper>
                <div className="Maine">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-7">

                                <div className="tekst">
                                    <div className="tytultekst">
                                        Co to za strona?
                                </div>
                                    <br /><br />
Strona jest projektem inżynierskim pod tytułem "Aplikacja wspomagająca analizę wyników sportowych.". Celem projektu jest zaprojektowanie oraz utworzenie systemu wspomagającego analizę
wyników sportowych  na przykładzie angielskiej Premier League bazując na inżynierii danych oraz statystyce. Aplikacja posiada różne funkcje, zaczynając od magazynu danych i statystyk
klubów oraz piłkarzy do wsparcia użytkowników w predykcji poszczególnych spotkań za pomocą algorytmu statystycznego rozkładu Poissona.
                            </div>
                            </div>
                            <div className="col-6 col-md-5"><img className="Ikonka2" alt="img" src={Oprojekcie} /></div>
                        </div>
                        <hr className="Linia" />

                        <div className="row">
                            <div className="col-6 col-md-5"><img className="Ikonka" alt="img" src={History} /></div>
                            <div className="col-12 col-md-7">
                                <div className="tekst">
                                    <div className="tytultekst">
                                        Funkcje - Dane historyczne.
                                </div>
                                    <br /><br />
                                Pierwszą z opisanych poniżej zadań strony jest przedstawienie użytkownikowi dane z poprzednich sezonów, które są uwzględniane także przy algorytmie predykcji.
                                Gość ma dostęp do statystyk z ostatnich pięciu sezonów, jako że składy jak i kluby cały czas się zmieniają uznałem, że najsensowniej będzie zebrać dane w oparciu
                                o tę liczbę do tyłu. Tak więc w skład tej opcji wchodzą tabele rozgrywek z lat uprzednich, statystyki zespołów na przestrzeni rozgrywek z tamtejszego sezonu,
                                statystyki piłkarzy, jednak uwzględniłem tam 10 najlepszych w każdej z kategorii, a także statystyki tzw. beniaminków, które od nastepnego sezonu zaczęły grę
                                w najwyższej klasie rozgrywkowej w Anglii.
                        </div>
                            </div>
                        </div>
                        <hr className="Linia" />

                        <div className="row">
                            <div className="col-12 col-md-7">
                                <div className="tekst">
                                    <div className="tytultekst">
                                        Funkcje - Dane obecnego sezonu.
                                </div>
                                    <br /><br />
                                Oprócz danych historycznych zainteresowany ma także dostęp do statystyk z obecnego sezonu, które są na bieżąco pobierane z dostępnego API. Wśród tych danych
                                podobnie jak w opisanych wyżej będzie aktualizowana na bieżąco tabela rozgrywek, statystyki zespołów jak i piłkarzy oraz w odróżnieniu od informacji z poprzednich
                                sezonów wyświetlane są wyniki ostatnich spotkań w tej klasie rozgrywek. Dane te także są uwzględniane przy metodzie predykcji.
                        </div>
                            </div>
                            <div className="col-6 col-md-5"><img className="Ikonka2" alt="img" src={Now} /></div>
                        </div>
                        <hr className="Linia" />
                        <div className="row">
                            <div className="col-6 col-md-5"><img className="Ikonka" alt="img" src={Prediction} /></div>
                            <div className="col-12 col-md-7">
                                <div className="tekst">
                                    <div className="tytultekst">
                                        Funkcje - Predykcja spotkań.
                                </div>
                                    <br /><br />
                              Kolejną funkcjonalnością aplikacji jest procentowe przewidywanie wyników poszczególnego spotkania drużyn wybranych przez użytkownika. Całość przeliczana jest za pomocą
                              rozkładu Poissona, który wyraża prawdopodobieństwo szeregu wydarzeń mających miejsce w określonym czasie. Pozwala on wyliczyć procentowe szanse na ilość zdobytych
                              bramek przez dany zespół w spotkaniu danych druzyn. Do analizy potrzebne są jedynie dane z trwającego sezonu jak i kilku poprzednich, za pomocą których obliczono siłę ofensywną
                              jak i defensywną zespołów. Dla lepszej dokładności przewidywane wyniki sa wyliczane za pomocą średniej arytmetycznej oraz średniej ważonej na przestrzeni różnej liczby
                              sezonów.

                        </div>
                            </div>
                        </div>
                        <hr className="Linia" />
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <div className="tekst">
                                    <div className="tytultekst">
                                        Funkcje - Następna kolejka.
                                </div>
                                    <br /><br />
                               Aby użytkownik był na bieżąco z terminarzem ligi dodano zakładkę z rozpisem całej najbliższej kolejki oraz dwóch przyszłych. Dane pobierane są na żywo a wyswietlone
                               zostanie tam zawsze 10 najbliższych spotkań. Jest także informacja o dacie i godzinie rozpoczęcia danego spotkania.
                        </div>
                            </div>
                            <div className="col-6 col-md-5"><img className="Ikonka2" alt="img" src={Next} /></div>
                        </div>
                        <hr className="Linia" />
                        <div className="row">
                            <div className="col-6 col-md-5"><img className="Ikonka2" alt="img" src={More} /></div>
                            <div className="col-12 col-md-7">
                                <div className="tekst">
                                    <div className="tytultekst">
                                        Dodatkowa funkcjonalność
                                </div>
                                    <br /><br />
                                Aplikacja stworzona jest z myślą o gościach używających przeróżnego sprzętu. Strona tworzona jest tak, aby była w pełni responsywna, z myślą o użytkownikach korzystających nie tylko
                                z komputerów stacjonarnych, czy laptopów, ale także zainteresowanych korzystających z tabletów, smartfonów i innych urządzeniach. Strona jest cały czas rozwijana o nowe funkcje oraz
                                udogodnienia dla klientów.
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer><Footer /></footer>
            </Wrapper>
        )
    }
}

export default Main;