export function validatable(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid &&
                validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.min && typeof validatableInput.value === 'string') {
        isValid = isValid && +validatableInput.value >= validatableInput.min;
    }
    return isValid;
}
