# PU - przykłady serwisów które mogę świadczyć


## ETL (Toyot-a)

To jest bardzo popularny teraz termin - oznacza Extract, Transform and Load (ETL).
Duże firmy (głowie ze wzgledu na AI, ale nie tylko) potrzebuja dużej ilości danych.
Dane te trzeba skąś pozyskać (extract), następnie zamienić do formy która będzie 
dla nas przydatna (transform), aby ostatecznie zapisać je do bazy danych (load).


I tak np dla Toyoty w Tokyo robiłem taki ETL. Toyota kupiła mapy drogowe dotyczące
całej Japonii - od firmy bodajże Zenrin (czy tak jakoś). Te mapy miały też takie 
informacje jak np, czy dany pas ruchu ma jedną czy dwie nitki/jezdnie, czy ta 
droga biegnie w tunelu, czy ten pas ruchu ma rozgalęzienia itd. Dane per se, które
dostaliśmy były danymi bardzo przydatnymi, ale sposób pogrupowania tych danych
był dla Toyot-y zupełnie nie na ręke. Dlatego moim zadniem było, wyciagniecie (extract)
danych z bazy danych Zenrin-a (dostawca map), przekonwertowanie/przegrupowanie (transform)
tych danych do formy którą toyot-a może przetrawic, a następnie załadowanie (load) 
tych danych do bazy danych już wewnątrz struktury toyoty. 

ETL - mozna określić jako automatyzacje zbierania niezbędnych danych, grupowania
ich w struktury które będa dla nas przydatne, a następnie załadowania ich do bazy
danych. Czyli jeśli mamy w firmie jakikolwiek manulany process, gdzie ktoś 
kopiuje skaś dane, następnie przelicza je np w excelu, a na końcu ładuje do
bazy danych/pliku - ten manulny process mozna zastąpić automatycznym processem
ETL. 


## Programowanie stron www

Napisalem niezliczona ilosc stron www. W różnych technologiach i różnych celach. 
Mówie o stronach które robią wiecej niż tylko "Jesteśmy super". Np zbudowałem 
strone www która była interfejsem do systemu billingowego firmy telekomunikacyjnej.
Co to oznacza? Oznacza to że klient tej firmy telekomunikacyjnej, mógł się zalogować
na strone, sprawdzić swój ówczesny billing, właczyć dodatkową usluge (jak sekretarka),
dodać nowy numer itd. Podobnie jak dzisiaj robia telecommy - tylko że ja to napisałem 
w 2001 roku. Nikt wtedy jeszcze tego nie robił. 

Jeśli firma ma jakieś dane, albo jakąkolwiek  'mechanike' która chce udostepnić
przez strone www to moge budować.


## Raporty finansowe (Acer)

To jest troche podobne do ETL.

To było dla firmy Acer (produkuja laptopy). Acer, na koniec roku musiał dla
norweskiego rządu przygotować jakiś raport sprzedaży, ze wzgledu na rozliczenie
z vat-u. Problem Acer był taki ze dane dotyczące sprzedaży były rozsiane po wielu
baza danych, excelach, plikach i różnych departamentach. Aplikacja która stworzyłem 
był bardzo mocno konfigurowalna, i umowzliwiała wyciaganie danych z dowolnych
systemów w Acer-ze, a następnie składała te dane w formie jednolitego raportu. 

Jest to process bardzo podobny do ETL z pominieciem L. Następowała ekstrakcja danych
z różnych systemów, następnie transformacja tych danych do jakies ujednoliconej form
jednak na koniec generowany byl dokument/raport - który był zapisany w pliku -
wiec nie było takiego klaszycznego L - load. 



## Legacy systems

Legacy systems - to innymi słowy takie bardzo stare system których już nikt
nie lubi/nienawidzi ale nie moze sie ich pozbyć bo są 1) za duże, 2) nikt
do konca juz nie wie co robią. 


3 krotnie przepisywałem systemy legacy:

- 20-30 letni system do wysyłania satelit na orbite (nowy system który odpalałem
juz z powodzeniem wyslal pare rakiet)

- jakis 20 letni system do szacowania ryzyka finanosowego dla jednego z najwiekszych
banków na swiecie (Bank of America)

- jakis około 15 letni system do analizy finansowej (ponownie jedna z najwiekszych firm
- Bloomberg.)

Przepisywanie systemów legacy - to jest spory rynek - tak mysle. Generalnie
w wielu firmach są takie systemy trupy, których nikt sie nie wazy dotykac.


## Gry aplikacje na telefony komórkowe

Kiedyś w sumie samodzielnie stworzyłem tą gre:
https://www.youtube.com/watch?v=l9iN8WxXr9Y


Jest wciaż dostepna na androida (ale moze sie wysypac na nowych telefonach
bo nie jest aktualizowana od lat
https://play.google.com/store/apps/details?id=com.blackted.piggybiggy&hl=en

Był tak okres, troche sie to teraz zmienilo, ale w uk bardzo duzo firm
jak wprowadzalo jakis nowy produkt na rynek, zawsze robiło to z jakaś 
glupia gierka na mobilki zeby w ten sposób reklamować. Pamietam że w jednej
firmie pisałem cos dla mc-donalda, jakas gre z frytkami czy cos w tym stylu. 
To mialo reklamowac jakies nowe zestawy i promocje w McDonalds.


## Sieci transmisji danych i głosu

Projektowałem fizyczne sieci transmisji zarówno danych (czyli np internet), oraz
sieci transmisji głosu.

Co do sieci, haczyłem/włamywałem sie na serwery. Kiedyś miałem sporo pohaczonych
serwerów uczelnianych i pare polskich serwerów rzadowych. 
Moge robić testy penetracyjne sieci, i rekomendować zabezpieczenia. 


## E-learning (Toyot-a)

Toyota mieściła sie w Tokyo i potrzebowała rozwiazania które umozliwiłoby lokalnym
japonczykom naukę angielskiego, a zatrudnionym obcokrajowcom, jakąś edukacje w 
zakresie japońskiej kultury (już nie pamietam dokładnie co).  Dodatkowo to rozwiazanie
zostało wykorzystywane także do video-conferencji.

Wiec zbudowałem dla nich strone, która byla niczym innym niż szkołą on-line. 
Były klasy na które mozna sie zapisywac, różne kursy, obecności, testy itp. 
Dodatkowo do tego rozwiazania dolaczylem mozliwosc video konferencji.

Jeśli jakaś firma potrzebuje zestawić virtualna szkołe dla swoich pracowników,
moge to uruchomić. Normalnie jest tam podział na studentów, nauczycieli, kursy itd.


## Systemy operacyjne

Kiedyś zanim pojawił sie Android, wiele telefonów działało na systemie
który nazywał sie symbian. Pisałem na ten system cała kryptografie, 
czyli szyfrowanie połączeń - np jak sie łączyłaś z bankiem z takiego telefonu
to szyfrowanie polaczenie robił software który napisalem. 


