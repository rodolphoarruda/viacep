# ViaCEP API Address Fetcher

This repository contains a simple JavaScript/jQuery script that integrates with the [ViaCEP](https://viacep.com.br) API to fetch address information based on a Brazilian postal code (CEP). The script validates the CEP format and automatically fills in the corresponding address fields once a valid CEP is provided.

## How It Works

- The user enters a **CEP** (Brazilian postal code) and clicks the **Fetch Address** button.
- The script sanitizes the input, ensuring only numbers are passed to the API.
- It validates if the CEP follows the correct format (8 digits).
- The address fields are initially cleared and then temporarily populated with placeholders (`...`) while the API request is made.
- The script sends an AJAX request to the ViaCEP API to fetch the address data.
- If the API returns valid data, it populates the address fields with the street, city area (bairro), city, and state information.
- If the CEP is invalid or not found, the script alerts the user and clears the fields.

## Script Breakdown

### 1. **CEP Field Sanitization:**

   The CEP field input is sanitized by removing any non-numeric characters.

```javascript
var cep = $('[name="cep"]').val().replace(/\D/g, '');
```

### 2. **Address Fields Cleanup:**

   A helper function clears the address fields to prepare for new data.

```javascript
function clean_up_cep_form() {
    $('[name="address_street"]').val("");
    $('[name="address_street_number"]').val("");
    $('[name="address_detail"]').val("");
    $('[name="address_city_area"]').val("");
    $('[name="address_city"]').val("");
    $('[name="address_state"]').val("");
}
```

### 3. **CEP Validation:**

   The script checks whether the entered CEP matches the format of eight numeric digits.

```javascript
var validacep = /^[0-9]{8}$/;
```

### 4. **ViaCEP API Request:**

   Using jQuery's `getJSON`, the script makes a request to ViaCEP’s API to fetch address data.

```javascript
$.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
    // handle the response
});
```

### 5. **Error Handling:**

   If the CEP is invalid or not found, the user is alerted, and the address fields are cleared.

```javascript
if (!("erro" in dados)) {
    // address found
} else {
    alert("CEP não encontrado. Tente novamente.");
}
```

## Requirements

- jQuery library (ensure jQuery is loaded in your project to use this script).

## Usage

1. Include the provided script in your HTML file.
2. Set up input fields for the CEP and the corresponding address fields (street, city area, city, state).
3. The button to fetch the address should have the `#fetch_address` ID for the click event to trigger the API request.

### Example HTML:

```html
<input type="text" name="cep" placeholder="Enter CEP">
<button id="fetch_address">Fetch Address</button>

<input type="text" name="address_street" placeholder="Street">
<input type="text" name="address_city_area" placeholder="City Area">
<input type="text" name="address_city" placeholder="City">
<input type="text" name="address_state" placeholder="State">
```

## Notes

- This script is designed to work specifically with the Brazilian postal system (CEP).
- Make sure the fields for the address data are correctly named (`address_street`, `address_city_area`, etc.).
- This script provides a basic implementation; further enhancements like error logging, improved validation, or better UX (e.g., loaders) can be added as needed.

## License

This project is licensed under the MIT License.


