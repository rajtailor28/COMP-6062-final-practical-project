const app = Vue.createApp({
    data() {
        return {
            randomFact: '',
            city: 'London, Ontario',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            word: '',
            definition: {
                definition: '',
                phonetic: '',
                partOfSpeech: ''
            }
        };
    },
    methods: {
        fetchRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        fetchWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        fetchDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    let entry = data[0];
                    this.definition.definition = entry.meanings[0].definitions[0].definition;
                    this.definition.phonetic = entry.phonetics[0].text;
                    this.definition.partOfSpeech = entry.meanings[0].partOfSpeech;
                });
        }
    },
    created() {
        this.fetchRandomFact();
        this.fetchWeather();
    }
});
app.mount('#app');
