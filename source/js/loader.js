// Checking data
const checkStatus = (response) => {
  return new Promise((onSuccess) => {
    if (response.ok) {
      onSuccess(response);
    }
  });
};

// Converting to json
const toJSON = (res) => {
  return res.json();
};

// Generating table
const generateTable = (result) => {
  let string = ``;
  result.value.forEach((item) => {
    string += `
    <tr class="table__row">
      <td>${item.UserName !== null ? item.UserName : `Не указано`}</td>
      <td>${item.FirstName !== null ? item.FirstName : `Не указано`}</td>
      <td>${item.LastName !== null ? item.LastName : `Не указано`}</td>
      <td>${item.MiddleName !== null ? item.MiddleName : `Не указано`}</td>
      <td>${item.Gender !== null ? item.Gender : `Не указано`}</td>
      <td>${item.Age !== null ? item.Age : `Не указано`}</td>
      <td>${item.Emails[0] ? item.Emails.join(` `) : `Не указано`}</td>
      <td>${item.FavouriteFeature !== null ? item.FavouriteFeature : `Не указано`}</td>
      <td>${item.Features[0] ? item.Features.join(` `) : `Не указано`}</td>
      <td>${item.AddressInfo[0] && item.AddressInfo[0].Address !== null ? item.Address : `Не указано`}</td>
      <td>${item.AddressInfo[0] && item.AddressInfo[0].City.Name !== null ? item.AddressInfo[0].City.Name : `Не указано`}</td>
      <td>${item.AddressInfo[0] && item.AddressInfo[0].City.CountryRegion !== null ? item.AddressInfo[0].City.CountryRegion : `Не указано`}</td>
      <td>${item.AddressInfo[0] && item.AddressInfo[0].City.Region !== null ? item.AddressInfo[0].City.Region : `Не указано`}</td>
    </tr>`
  })

  const resultingTable = `<table class="table">
  <tbody>
    <tr class="table__header">
      <td>User name</td>
      <td>First name</td>
      <td>Last name</td>
      <td>Middle name</td>
      <td>Gender</td>
      <td>Age</td>
      <td>Emails</td>
      <td>Favorite feature</td>
      <td>Features</td>
      <td>Address</td>
      <td>City name</td>
      <td>Country region</td>
      <td>Region</td>
    </tr>
    ${string}
  </tbody>
</table>`

  return resultingTable;
}

// Applying to DOM
const showData = (res) => {
  const newsBlock = document.querySelector(`.slider-news`);
  newsBlock.insertAdjacentHTML(`afterEnd`, res);
}

// Show error;
const showError = (error) => {
  return showData(`<div class="error">
        <p class="error__message">Произошла ошибка ${error} =(</p>
        <p class="error__message">Пожалуйста, попробуйте перезагрузить страницу.</p>
      </div>`);
}

// XHRequest
const loader = () => {
  fetch(`http://services.odata.org/TripPinRESTierService/People`)
          .then(checkStatus)
          .then(toJSON)
          .then(generateTable)
          .then(showData)
          .catch(showError);
}

export default loader;
