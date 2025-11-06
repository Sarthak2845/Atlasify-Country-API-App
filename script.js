const countryContainer = document.querySelector(".countries-container");
const darkModeToggle = document.querySelector(".dark-mode-btn");
const filterRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-input");
var opt='filter';
let allCountriesData
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCards(data)
    allCountriesData = data
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
    countryContainer.innerHTML = "<p>Failed to load countries data.</p>";
  });

  filterRegion.addEventListener("change", (e) => {
  opt=String(e.target.value);
  if (e.target.value === 'filter') {
    fetch("https://restcountries.com/v3.1/all").then((res) => res.json())
      .then((data) => {
        renderCards(data)
      })
  }

  else {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) => res.json())
      .then((data) => {
        renderCards(data)
      })
  }
})

function renderCards(data) {
  countryContainer.innerHTML = ''
  data.forEach((country) => {
    if(opt === 'filter' || country.region.toLowerCase() === opt)
    {
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `/country.html?name=${country.name.common}`
      const cardHtml = `
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString()}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital ? country.capital[0] : "N/A"}</p>
        </div>`;
      countryCard.innerHTML = cardHtml;
      countryContainer.appendChild(countryCard);
    }
  });
}

searchInput.addEventListener("input", ((e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCards(filteredCountries)
}))

darkModeToggle.addEventListener("click", () => {
//fixing dark-mode
  document.body.classList.toggle("dark-mode-body");
  document.querySelector(".header-container").classList.toggle("dark-mode-header");
  const countryCards = document.querySelectorAll(".country-card");
  countryCards.forEach(card => {
    card.classList.toggle("dark-mode-card");

  });
  const isDarkMode=document.body.classList.contains("dark-mode-body");
  localStorage.setItem("darkMode", isDarkMode ? "on" : "off");
  const icon = darkModeToggle.querySelector("i");
  if (isDarkMode) {
    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
    darkModeToggle.innerHTML = `<i class="bi bi-sun-fill"></i>&nbsp;&nbsp;Light Mode`;
  } else {
    icon.classList.replace("bi-sun-fill", "bi-moon-fill");
    darkModeToggle.innerHTML = `<i class="bi bi-moon-fill"></i>&nbsp;&nbsp;Dark Mode`;
  }
});

window.addEventListener("load",()=>{
  const darkModeState = localStorage.getItem("darkMode");
  if (darkModeState === "on") {
    document.body.classList.add("dark-mode-body");
    document.querySelector(".header-container").classList.add("dark-mode-header");

    const countryCards = document.querySelectorAll(".country-card");
    countryCards.forEach(card => {
      card.classList.add("dark-mode-card");
    });
    const icon = darkModeToggle.querySelector("i");
    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
    darkModeToggle.innerHTML = `<i class="bi bi-sun-fill"></i>&nbsp;&nbsp;Light Mode`;
  }
})
