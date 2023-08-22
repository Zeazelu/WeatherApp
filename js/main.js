document.addEventListener("DOMContentLoaded", () => {
    const citySelect = document.getElementById("citySelect");
    const searchButton = document.getElementById("searchButton");
    const weatherDetails = document.getElementById("weatherDetails");

    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
        citySelect.value = savedCity;
    }

    searchButton.addEventListener("click", () => {
        const selectedCity = citySelect.value;

        if (selectedCity) {
            fetch("https://danepubliczne.imgw.pl/api/data/synop")
                .then(response => response.json())
                .then(data => {
                    const weatherData = data.find(entry => entry.stacja.toLowerCase() === selectedCity.toLowerCase());

                    if (weatherData) {
                        const { stacja, data_pomiaru, temperatura, suma_opadu, cisnienie } = weatherData;

                        weatherDetails.innerHTML = `
                            <h2>${stacja} (${data_pomiaru})</h2>
                            <h4>Temperatura: ${temperatura}°C</h4>
                            <h4>Suma opadu: ${suma_opadu}mm</h4>
                            <h4>Ciśnienie: ${cisnienie} HPa</h4>
                        `;
                        const savedWeatherData = {
                            stacja,
                            data_pomiaru,
                            temperatura,
                            suma_opadu,
                            cisnienie
                        };
                        localStorage.setItem("selectedCity", selectedCity);
                        localStorage.setItem("weatherData", JSON.stringify(savedWeatherData));
                    } else {
                        alert("Nie znaleziono pogody dla danego miasta");
                    }
                })
                .catch(error => {
                    alert("Wystąpił problem podczas ładowania danych:", error);
                });
        } else {
            alert("Proszę wybrać miasto przed wyszukaniem");
        }
    });

    const savedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (savedWeatherData) {
        const { stacja, data_pomiaru, temperatura, suma_opadu, cisnienie } = savedWeatherData;

        weatherDetails.innerHTML = `
            <h2>${stacja} (${data_pomiaru})</h2>
            <h4>Temperatura: ${temperatura}°C</h4>
            <h4>Suma opadu: ${suma_opadu}mm</h4>
            <h4>Ciśnienie: ${cisnienie} HPa</h4>
        `;
    }
});
