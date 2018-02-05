const Discord = require('discord.js');
const client = new Discord.Client();
const google = require('google');

// SEKCJA KONFIGURACJI
// Tu wpisz swój token:
client.login('');
// Tu wpisz prefix dla komendy:
var prefix = '!';
// KONIEC KONFIGURACJI

client.on('ready', () => { // informacja o zalogowaniu
    console.log(`Zalogowano jako ${client.user.tag}`);
  });

var pozwijmode, pozwijmodev, powod, pozwany; // deklaracja zmiennych do pozwywania
client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); // wycinanie komendy i argumentow

    switch(command) {
        case "pozwij":
            // komenda pozwij inicjująca tryb pozywania
            message.channel.send(`Więc, ${message.author}, kogo chcesz pozwać?`)
            .then( () => {
                pozwijmode = message.author;
                pozwijmodev = 1;
            })
            break;
        case "hash":
            // komenda reklamujaca hardwarehash
            message.channel.send(`HardwareHash pobierzesz stąd: https://xiaomii.cf/hash`);
            break;
        case "fil":
            // komenda do informowania o free indian leaks
            const embed = new Discord.RichEmbed()
            .setAuthor("Free Indian Leaks", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/240px-Flag_of_India.svg.png")
            .setTitle(`Welcome to Free Indian Leaks!`)
            .setDescription(`Free leaks of famous persons like _roofik_ or dąb\nType !leak <nick> for leaks!`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/240px-Flag_of_India.svg.png');
            message.channel.send({embed})
            break;
        case "help":
            // lista komend
            const pomoc = new Discord.RichEmbed()
            .setAuthor("Hash Bot", 'https://cryptonews.pl/wp-content/uploads/2017/08/bitcoin-3.jpeg')
            .setColor(0x461d47)
            .addField(`${prefix}pozwij`, `Włącz tryb pozywania użytkowników. Uwaga! W etapie wybierania użytkownika do pozwania OZNACZ go.`)
            .addField(`${prefix}hash`, `Strona HardwareHash`)
            .addField(`${prefix}fil`, `Free Indian Leaks (niedokończone)`)
            .addField(`${prefix}8pilka`, `zobacz co przyniesie ci moja magiczna 8ku znaczy piłka`)
            .addField(`${prefix}odwroc`, `śoc ćórwdo`)
            .addField(`${prefix}ciastko`, `Darmowe ciastko`)
            .addField(`${prefix}google`, `Szukaj w Google`);
            message.channel.send({embed: pomoc})
            break;
        case "8pilka":
            // 8ball
            let text = args.slice(0).join(" ");
            var is = Math.floor((Math.random() * 6) + 0);
            var odpowiedzi = ['Raczej nie!', 'Oczywiście!', 'Ty no nie wiem', 'eee papryka', 'Xiaomi lepsze', 'Jak najbardziej', 'Hehe nie'];
            if (text.toLowerCase().includes("xiaomi lepsze")) is = 4; //jesli pytanie to xiaomi lepsze, zawsze odpowiadaj xiaomi lepsze
            const mbed = new Discord.RichEmbed()
            .setAuthor("8piłka")
            .setTitle("Co ci powie moja osiem piłka?")
            .setColor(0x198c41)
            .setDescription(odpowiedzi[is]);
            message.channel.send({embed: mbed})
            break;
        case "odwroc":
            // komenda odwracajaca slowo
            let reverse = args.slice(0).join(" ");
            let emoi = "\🙃"
            message.channel.send(`${emoi} ${reverse.split("").reverse().join("")}`);
            break;
        case "ciastko":
            let cookie = "\🍪";
            message.channel.send(`${message.author.tag}, masz tu: ${cookie}`)
            break;
        case "google":
            // wysyla zapytanie do google
            let gugel = args.slice(0).join(" ");
            const resgoogle = new Discord.RichEmbed()
            .setAuthor("Google")
            .setTitle("Zapytanie: "+gugel)
            .setColor(0x198c41)
            google.resultsPerPage = 5;
            google(gugel, function (err, res){
                if (err) console.error(err)
                // dodaje do embeda kazde zapytanie
                for (var i = 0; i < res.links.length-1; ++i) {
                  var link = res.links[i];
                  resgoogle.addField(link.title, link.href)
                  if (res.links.length - 2 == i) {
                    // kiedy juz wszystkie sa dodane, wysyla embeda
                    message.channel.send({embed: resgoogle})
                    }
                }
            })
            break;
    }
    // jezeli pozwij mode jest wlaczone 
    if (message.author == pozwijmode) {
        // pozwij mode etap 1: wychwytuje mention kogo chcesz pozwac i pyta o powod
        if (pozwijmodev == 1) {
            pozwany = message.mentions.members.first();
            message.channel.send(`A więc pozywasz ${pozwany}. \nO co go pozywasz?`)
            .then( () => {
            pozwijmodev = 2;
            })
        }
        // pozwij mode etap 2: wyswietla dane i pyta o ich prawidlowosc
        else if (pozwijmodev == 2) {
            if (typeof pozwany == 'undefined') return;
            powod = message.content;
            const embed = new Discord.RichEmbed()
            .setAuthor("Sadownictwo Bot", "http://ro.com.pl/wp-content/uploads/2014/11/wesolowska.jpg")
            .setTitle(`${message.author.tag} pozywa ${pozwany.displayName}`)
            .setDescription(`Powód: ${powod}`)
            .setThumbnail('http://sadarbitrazowy.com.pl/img/mlotek.png')
            .addField('Wszystko się zgadza?', 'tak/nie');
            message.channel.send({embed})
            .then( () => {
              pozwijmodev = 3;  
            })
        }
        // pozwij mode etap 3: wychwytuje odpowiedz i w zaleznosci od niej pozywa i resetuje pozwijmode
        else if (pozwijmodev == 3) {
            if(message.content.toLowerCase() == 'nie') {
                message.channel.send('To sobie jeszcze raz wpisz !pozwij i rób od nowa.');
                pozwijmodev = null;
                pozwijmode = null;
            } else if (message.content.toLowerCase() == 'tak') {
                message.channel.send('No to pozwany.');
                pozwijmodev = null;
                pozwijmode = null;
            } else {
                message.channel.send('mów wyraźniej');
            }
        }
    }
});
