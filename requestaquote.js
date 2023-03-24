const form = document.querySelector('#form'), sendersName = document.querySelector('#senders-name'), sendersAddress = document.querySelector('#senders-address'), sendersNumber = document.querySelector('#senders-number'),
receiversName = document.querySelector('#receivers-name'), receiversAddress = document.querySelector('#receivers-address'), receiversNumber = document.querySelector('#receivers-number'), 
productDescription = document.querySelector('#product-description'), quantity = document.querySelector('#quantity'), estimatedValue = document.querySelector('#estimated-value'),
terms = document.querySelector('#terms'); 

// adding an event listenet to the form element
form.addEventListener ('submit', (e) => {
    e.preventDefault();
    validateInputs();
})

// error setter function definition
function setError (element, message) {
    
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-cont');

    errorDisplay.innerHTML = `<p>${message}</p>`;
    console.log(element.id);
    if ((element.id === 'senders-address' || element.id === 'receivers-address') || (element.id === 'product-description' || element.id === 'quantity' || element.id === 'estimated-value')) {

        element.classList.add('errortwo');
    } else {
        element.classList.add('error')
    };

    element.classList.remove('success');
    
}

function setSuccess (element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-cont');

    errorDisplay.innerHTML = "";
    if ((element.id === 'senders-address' || element.id === 'receivers-address') || (element.id === 'product-description' || element.id === 'quantity' || element.id === 'estimated-value')) {
        element.classList.remove('errortwo');
        element.classList.add('successtwo');
    } else {
        element.classList.remove('error');
        element.classList.add('success')
    };

    element.classList.add ('success');

}

function validateInputs() {
    const senderNameValue = sendersName.value.trim(), senderAddressValue = sendersAddress.value.trim(), senderNumberValue = sendersNumber.value.trim(),
    receiverNameValue = receiversName.value.trim(), receiverAddressValue = receiversAddress.value.trim(), receiverNumberValue = receiversNumber.value.trim(),
    productDescriptionValue = productDescription.value.trim(), quantityValue = quantity.value.trim(), estimatedVal = estimatedValue.value.trim(),
    termsValue = terms.value.trim();

    if (senderNameValue === '') {
        setError(sendersName, '*Required');
    } else {
        setSuccess(sendersName);
    }
    if (senderAddressValue === '') {
        setError(sendersAddress, '*Required');
    } else {
        setSuccess(sendersAddress);
    }
    if (senderNumberValue === '') {
        setError(sendersNumber, '*Required');
    } else {
        setSuccess(sendersNumber);
    }
    if (receiverNameValue === '') {
        setError(receiversName, '*Required');
    } else {
        setSuccess(receiversName);
    }
    if (receiverAddressValue === '') {
        setError(receiversAddress, '*Required');
    } else {
        setSuccess(receiversAddress);
    }
    if (receiverNumberValue === '') {
        setError(receiversNumber, '*Required');
    } else {
        setSuccess(receiversNumber);
    }
    if (productDescriptionValue === '') {
        setError(productDescription, '*Required');
    } else {
        setSuccess(productDescription);
    }
    if (quantityValue === '') {
        setError(quantity, '*Required');
    } else {
        setSuccess(quantity);
    }
    if (estimatedVal === '') {
        setError(estimatedValue, '*Required');
    } else {
        setSuccess(estimatedValue);
    }
}

