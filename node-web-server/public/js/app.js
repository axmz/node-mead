const city = document.querySelector('form');

city.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const input = e.target[0].value

  fetch(`http://localhost:3000/weather?city=${input}`).then(res => res.json().then(data => {
    if (data.error) {
      return data.error;
    } else {
      console.log(data)
      return data;
    }
  }))
})