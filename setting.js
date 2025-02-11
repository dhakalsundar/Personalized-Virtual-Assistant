
document.addEventListener('DOMContentLoaded', () => {
    // Handle "Edit Account" button click
    const editAccountButton = document.querySelector('#account .button');
    const accountSection = document.querySelector('#account');

    editAccountButton.addEventListener('click', () => {
        // Create a form dynamically for editing account details
        accountSection.innerHTML = `
            <h2>Edit Account</h2>
            <form id="editAccountForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="John Doe" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="johndoe@example.com" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter new password">

                <div class="form-actions">
                    <button type="button" id="saveAccountChanges" class="button">Save</button>
                    <button type="button" id="cancelEdit" class="button" style="background-color: #e74c3c;">Cancel</button>
                </div>
            </form>
        `;

        // Handle Save and Cancel actions
        document.querySelector('#saveAccountChanges').addEventListener('click', saveAccountChanges);
        document.querySelector('#cancelEdit').addEventListener('click', cancelEditAccount);
    });

    function saveAccountChanges() {
        // Get values from the form
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // Update the account section with new values
        accountSection.innerHTML = `
            <h2>Account</h2>
            <p>Manage your account settings, including email, password, and personal information.</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${password ? '<p><strong>Password:</strong> ********</p>' : ''}
            <a href="#" class="button">Edit Account</a>
        `;

        // Re-attach the edit functionality
        document.querySelector('#account .button').addEventListener('click', () => {
            editAccountButton.click();
        });
    }

    function cancelEditAccount() {
        // Restore the original account section
        accountSection.innerHTML = `
            <h2>Account</h2>
            <p>Manage your account settings, including email, password, and personal information.</p>
            <a href="#" class="button">Edit Account</a>
        `;

        // Re-attach the edit functionality
        document.querySelector('#account .button').addEventListener('click', () => {
            editAccountButton.click();
        });
    }
});


