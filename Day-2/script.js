function validateForm() {
    const nameInput = document.getElementById('name-input');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const commentsInput = document.getElementById('comment-input');

    // Check if name and comments fields are not empty
    if (nameInput.value.trim() === '' || commentsInput.value.trim() === '') {
        alert('All fields are compulsory');
        
        // Set focus to the first empty field (name or comments)
        if (nameInput.value.trim() === '') {
        nameInput.focus();
        } else {
        commentsInput.focus();
        }

        return;
    }

    // Check if the user has selected a gender
    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) {
        genderSelected = true;
        }
    });

    if (!genderSelected) {
        alert('Please select a gender.');
        return;
    }
    alert('Form is valid! You can submit.');
};