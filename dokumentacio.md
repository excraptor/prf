# PRF kötelező program munkanapló

Projekt url: https://prf-kotprog-7d9a6.web.app

Bejelentkezés: 
- Admin:
    - email: szaboz@inf.u-szeged.hu
    - pw: PRF2022
- User:
    - email: user@user.com
    - pw: asdf123


## **2022.04.10**

Először is generáltam egy új Angular projektet, amit rögtön össze is kötöttem a Firebase-szel. Ehhez létrehoztam a Firebase Console-ban egy új alkalmazást, majd a `firebase init` parancs után a konzolban megadott adatokat beillesztettem a megfelelő helyre, és tulajdonképpen kész is volt az összekötés. Ezután létrehoztam az első komponenseket - home, login - és a hozzájuk tartozó route-olást is beállítottam.

A home képernyőn a storage-t szimuláltam egy service-szel, amiből egyelőre csak adatokat lehetett lekérdezni.

## **2022.04.12**

A Firebase inicializálása után már be lehetett üzemelni a login komponenst is. A bejelentkezéshez és regisztrációhoz a Firebase Authentication-t használtam. Létrehoztam a szükséges metódusoknak egy új service-t, amit beinjektálva a login komponensbe elérhetőek lettek a szükséges függvények. 

A login és register flow-t megvalósítása után egy guard-dal beállítottam, hogy csak bejelentkezett userek érhessék el a főoldalt, bejelentkezés nélkül pedig navigáljon a login oldalra.

Bekötöttem az alkalmazásba a Firestore-t is, amivel szintén egy service-n keresztük kommunikál az app. Lecseréltem a korábbi dummy adatbázist rendes adatbázis elérésre, és a service-ben megvalósítottam az adatok lekérése és új adat hozzáadása funkciót. Ehhez elkészült a home komponensen a megjelenítés is.

## **2022.04.16**

Az adatok eddig elég barbár módon voltak kezelve, ezért létrehoztam az Item modellt. Refaktoráltam a kódot az új modell osztály használatával. Ezután a vásárlási logikát fejlesztettem tovább, létrejött a cart component. A vásárló bele tud helyezni a kosarába egy tárgyból valamennyit, és meg tudja nézni a kosarát. 

A storage service-ben megvalósítottam a delete függvényt.

Valahol ezen a ponton választottam szét élesebben az admin és a sima felhasználó megjelenítési logikát. Tárgyakat csak az adminok tudnak törölni, a kosárba pedig csak felhasználók rakhatnak tárgyakat. Az új tárgy hozzáadása form is csak az adminok részére jelenik meg.

## **2022.04.17**

Továbbfejlesztettem a kosár funkcionalitását, megvalósítottam, hogy lehessen a kosárból törölni tételeket. Ekkor arra kellett figyelni, hogy az elérhető mennyiséget vissza kellett növelni az áruknál, mert "visszapakoltunk" valamennyi tárgyat a "polcra". Valahol itt kellett módosítanom az Item modellen, mert az összes mennyiséget és az elérhető mennyiséget külön kellett kezelnem.

Az adminoknak pedig létrehoztam, hogy a tárgyak elérhető mennyiségét tudják módosítani a főoldalról.

## **2022.04.18**

A mennyiség változtatásával akadtak gondok, de azokat sikerült megoldanom two-way bindinggel. 

Befejeztem a kosárból törlés funkcionalitást, hogy rendesen működjön. 

Végre megszületett a vásárlás gomb is, amivel a vásárló meg is tudja venni a kosárba rakott termékeit, kiírja az összes árat stb.

## **2022.04.20**

A kosárban lévő itemek árát először rosszul számolta az app, de azt kijavítottam.

A Firestore-ban beállítottam a rulest korábban, hogy lehessen bárkinek írni olvasni bármit az adatbázisból. Beállítottam azt is, hogy csak két, adott emailcímmel rendelkező admin tudjon csak törölni vagy hozzáadni az adatbázishoz. A módosítást meg kellett hagyni a sima felhasználóknak is, mert a vásárlás jár egy módosítással az adatbázisban. 

Ezután elkezdtem utánajárni a deploy folyamatnak, le is futott a command, de csak egy default oldalt kaptam.

## **2022.05.03**

Sikerült kideployolni az alkalmazást, nem volt átállítva a firebase.json fájlban a "public" directory a defaultról az appra, ezért mutatta csak a default index.html-t. Miután leellenőriztem mindent a deployolt appon is, megírtam ezt a dokumentumot.



