// Get the select element
const select = document.querySelector('.countries');

// Get the table body
const tableBody = document.querySelector('tbody');

// Get the stored countries from local storage
let storedCountries = JSON.parse(localStorage.getItem('selectedCountries')) || [];

// Function to update the table with the stored countries
function updateTable() {
  // Clear the table body
  tableBody.innerHTML = '';

  // Loop through the stored countries and create a row for each one
  storedCountries.forEach((country, index) => {
    // Create a new row in the table
    const newRow = document.createElement('tr');

    // Create a cell for the country name
    const countryCell = document.createElement('td');
    countryCell.textContent = country;

    // Create a cell for the delete button
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'Delete';

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', function() {
      // Remove the country from the stored countries array
      storedCountries.splice(index, 1);

      // Update the stored countries in local storage
      localStorage.setItem('selectedCountries', JSON.stringify(storedCountries));

      // Update the table
      updateTable();
    });

    // Append the delete button to the delete cell
    deleteCell.appendChild(deleteButton);

    // Create a cell for the edit button
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.classList.add('edit')
    editButton.textContent = 'Edit';

    // Add an event listener to the edit button
    editButton.addEventListener('click', function() {
      // Get the new country name from the user
      const newCountry = prompt('Enter the new country name:', country);

      // Update the stored countries array with the new country name
      if (newCountry) {
        storedCountries[index] = newCountry;
        
        // Update the stored countries in local storage
        localStorage.setItem('selectedCountries', JSON.stringify(storedCountries));
        
        // Update the table
        updateTable();
      }
    });

    // Append the edit button to the edit cell
    editCell.appendChild(editButton);

    // Append the cells to the row
    newRow.appendChild(countryCell);
    newRow.appendChild(deleteCell);
    newRow.appendChild(editCell);

    // Append the row to the table body
    tableBody.appendChild(newRow);
  });
}

// Update the table with the stored countries
updateTable();

// Add an event listener to the select element
select.addEventListener('change', function() {
  // Get the selected country value
  const selectedCountry = select.value;

  // Add the selected country to the stored countries array
  storedCountries.push(selectedCountry);

  // Update the stored countries in local storage
  localStorage.setItem('selectedCountries', JSON.stringify(storedCountries));

  // Update the table
  updateTable();
});