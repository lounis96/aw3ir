/*window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
    console.log("DOM ready!");
    document.getElementById('RESET').addEventListener('click', function () {
        contactStore.reset();
        displayContactList();
    });
    displayContactList();
};

function validate(event) {
    event.preventDefault();
    let first_name = document.getElementById("prenom").value;
    let last_name = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("adresse").value;
    let data_of_birth = document.getElementById("date-de-naissance").value;
    const birthdayDate = new Date(data_of_birth);
    const birthdayTimestamp = birthdayDate.getTime();

    if (first_name == '' || last_name == '' || data_of_birth == '' || email == '') {
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return false;
    }

    if (first_name.length < 5) {
        alert('Prénom doit avoir 5 caractères minimum');
        return false;
    }

    if (last_name.length < 5) {
        alert('Nom doit avoir 5 caractères minimum');
        return false;
    }

    if (address.length < 5) {
        alert('Adresse doit avoir 5 caractères minimum');
        return false;
    }

    if (data_of_birth == '') {
        alert('Svp entrez une date de naissance!');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Email invalid!');
        return false;
    }

    if (birthdayTimestamp > Date.now()) {
        alert('Date de naissance invalid!');
        return false;
    }

    /*map_data = constructMap(address);
    console.log(map_data);
    // Updating modal data
    document.getElementById("target-firstname").textContent = first_name;
    document.getElementById("target-birthday").textContent= data_of_birth;
    document.getElementById("target-firstname").textContent = first_name;
    document.getElementById("target-map-img").src = map_data['img-url'];
    document.getElementById("target-map-url").href = map_data['url'];
    document.getElementById("target-address").textContent = address;

    let dataModal = new bootstrap.Modal(document.getElementById('dataModal'));
    dataModal.show();
    return false;*/
  /*  contactStore.add(first_name, last_name, data_of_birth, address, email);
    displayContactList();
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function constructMap(address) {
    return {
        'img-url': `https://maps.googleapis.com/maps/api/staticmap?markers=${address}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`,
        'url': `http://maps.google.com/maps?q=${address}`,
    };
}

document.getElementById('btnGPS').addEventListener('click', function () {
    obtenirCoordonneesGPS();
});
function obtenirCoordonneesGPS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Récupérer les coordonnées
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Utiliser les coordonnées comme nécessaire (par exemple, les afficher dans le champ d'adresse)
                document.getElementById('adresse').value = 'Latitude : ' + latitude + ', Longitude : ' + longitude;
            },
            function (error) {
                // Gérer les erreurs de géolocalisation
                console.error('Erreur de géolocalisation : ', error.message);
            }
        );
    } else {
        alert('La géolocalisation n\'est pas prise en charge par votre navigateur.');
    }
}
function calcNbChar(id) {
    document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length;
}
function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    document.querySelector("table tbody").innerHTML = '';
    for (const contact of contactList) {
        document.querySelector("table tbody").innerHTML +=
            `<tr>
    <td>${contact.name}</td>
    <td> ${contact.firstname} </td>
    <td> ${contact.date} </td>
    <td> ${contact.adress} </td>
    <td> ${contact.mail} </td>
    <!-- CODE à compléter pour insérer les autres données du contact -->
    <tr>`;
    }
}
*/
window.onload = function () {
    console.log("DOM ready!");
    displayContactList();
    // ajouter les nombres de caracteres 
    document.addEventListener("keyup", function () {
        updateCharCount("inputNom", "calcul1");
        updateCharCount("inputPrenom", "calcul2");
        updateCharCount("inputDate", "calcul3");
        updateCharCount("inputAdresse", "calcul4");
        updateCharCount("inputEmail3", "calcul5");

        // Validation process
        var valid = true;
        valid = validateField("inputNom", 5) && valid;
        valid = validateField("inputPrenom", 5) && valid;
        valid = validateField("inputDate", 5) && valid;
        valid = validateField("inputAdresse", 5) && valid;
        valid = validateField("inputEmail3", 5) && valid;

        return valid;
    });

    // Add submit event listener for form submission
    document.getElementById("envoie").addEventListener("click", function (event) {
        event.preventDefault();
        if (validateForm()) {
            storeFormData();
            // Explicitly set an empty array in localStorage
            localStorage.setItem('contactList', JSON.stringify([]));

            displayContactList();


        }
    });
    document.getElementById("Reset").addEventListener("click", function (event) {
        event.preventDefault();
        contactStore.reset();
        displayContactList();

    });
    // Function to update character count
    function updateCharCount(inputId, countId) {
        var inputField = document.getElementById(inputId);
        var charCountSpan = document.getElementById(countId);
        var charCount = inputField.value.length;
        charCountSpan.textContent = `${charCount} Car.`;
    }

    // Function to validate a field based on minimum length
    function validateField(inputId, minLength) {
        var inputField = document.getElementById(inputId);

        if (inputField.value.length < minLength) {
            inputField.style.borderColor = "#ff0000";
            return false;
        } else {
            inputField.style.borderColor = "#48DE14";
            return true;
        }
    }
    function validateForm() {
        // Récupérer les valeurs des champs
        const nom = document.getElementById('inputNom').value;
        const prenom = document.getElementById('inputPrenom').value;
        const adresse = document.getElementById('inputAdresse').value;
        const email = document.getElementById('inputEmail3').value;
        const dateNaissance = document.getElementById('inputDate').value;

        if (nom === '' || prenom === '' || adresse === '' || email === '' || dateNaissance === '') {
            // Si l'un des champs est vide, afficher le modal
            var myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();
            return false;
        }

        // longueur des champs texte
        if (nom.length < 5 || prenom.length < 5 || adresse.length < 5) {
            alert("Les champs texte doivent avoir au moins 5 caractères.");
            return false;
        }

        // format de l'email
        if (!validateEmail(email)) {
            alert("Veuillez entrer une adresse email valide.");
            return false;
        }

        // si la date de naissance est dans le futur
        const birthdayDate = new Date(dateNaissance);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (birthdayTimestamp > nowTimestamp) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    // Function to store form data in localStorage
    function storeFormData() {
        var inputNom = document.getElementById("inputNom");
        var inputPrenom = document.getElementById("inputPrenom");
        var inputDate = document.getElementById("inputDate");
        var inputAdresse = document.getElementById("inputAdresse");
        var inputEmail = document.getElementById("inputEmail3");

        contactStore.add(
            inputNom.value,
            inputPrenom.value,
            inputDate.value,
            inputAdresse.value,
            inputEmail.value
        );

        // Display success message
        document.getElementById("success").classList.add("alert", "alert-success");
        document.getElementById("success").textContent = "Contact ajouté avec succès.";

        var tableRow = `<tr>
            <td>${inputNom.value}</td>
            <td>${inputPrenom.value}</td>
            <td>${inputDate.value}</td>
            <td><a href="https://maps.google.com/maps?q=${inputAdresse.value}">${inputAdresse.value}</a></td>
            <td><a href="mailto:${inputEmail.value}">${inputEmail.value}</a></td>
        </tr>`;

        document.querySelector("table tbody").innerHTML += tableRow;
        // Clear input fields
        inputNom.value = "";
        inputPrenom.value = "";
        inputDate.value = "";
        inputAdresse.value = "";
        inputEmail.value = "";


    }
    function displayContactList() {
        const contactTableBody = document.querySelector("table tbody");

        // Retrieve existing HTML content of the table body
        const existingRows = contactTableBody.innerHTML;

        // Clear existing rows
        contactTableBody.innerHTML = existingRows;

        // Retrieve contactList from local storage
        getContactListFromLocalStorage(function (contactList) {
            for (const contact of contactList) {
                contactTableBody.innerHTML +=
                    `<tr>
                        <td>${contact.inputNom}</td>
                        <td>${contact.inputPrenom}</td>
                        <td>${contact.inputDate}</td>
                        <td ><a href="https://maps.google.com/maps?q=${contact.inputAdresse}">${contact.inputAdresse}</a></td>
                        <td ><a href="mailto:${contact.inputEmail}">${contact.inputEmail}</a></td>
                    </tr>`;
            }

            // Update the contactListTitle with the number of contacts
            const contactListTitle = document.getElementById('contactListTitle');
            const rowCount = document.querySelectorAll("table tbody tr").length;
            contactListTitle.textContent = `Liste des contacts (${rowCount})`;
        });
    }

    // Callback function to retrieve contactList from local storage
    function getContactListFromLocalStorage(callback) {
        const contactListString = localStorage.getItem('contactList');
        const contactList = contactListString ? JSON.parse(contactListString) : [];
        callback(contactList);
    }



};