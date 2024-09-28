// jQuery Scripts
$(document).ready(function () {

    // ViaCEP API integration
    $("#fetch_address").click(function (event) {

        // prevent form from submitting
        event.preventDefault();

        // remove characters different from numbers 
        var cep = $('[name="cep"]').val().replace(/\D/g, '');

        // clean up address fields as preparation for new data
        function clean_up_cep_form() {
            $('[name="address_street"]').val("");
            $('[name="address_street_number"]').val("");
            $('[name="address_detail"]').val("");
            $('[name="address_city_area"]').val("");
            $('[name="address_city"]').val("");
            $('[name="address_state"]').val("");
        }

        clean_up_cep_form();

        // check if cep field isn't empty
        if (cep != "") {

            // cep format validation
            var validacep = /^[0-9]{8}$/;
            if (validacep.test(cep)) {

                // loads temporary data (...) while the API fetches the address data
                $('[name="address_street"]').val("...");
                $('[name="address_city_area"]').val("...");
                $('[name="address_city"]').val("...");
                $('[name="address_state"]').val("...");

                // fetch address data from ViaCEP API
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    // if no errors were found, fetch the data
                    if (!("erro" in dados)) {

                        // loads address data
                        $('[name="address_street"]').val(dados.logradouro);
                        $('[name="address_city_area"]').val(dados.bairro);
                        $('[name="address_city"]').val(dados.localidade);
                        $('[name="address_state"]').val(dados.uf);

                    } else {
                        // cep code not found
                        clean_up_cep_form();
                        alert("CEP não encontrado. Tente novamente.");
                    };
                });
            } else {
                // invalid cep.
                clean_up_cep_form();
                alert("Formato de CEP inválido. Tente novamente.");
            };

        } else {
            // cep field empty
            clean_up_cep_form();
            alert("Preencha o campo CEP e tente novamente.");
        };
    });
    // END :: ViaCEP API integration that fetches the address data

});
