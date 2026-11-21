// Initialize EmailJS

emailjs.init({
    publicKey: "MNcv-g6_IiWltSY9g"
});


const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {

    // Prevent page reload
    e.preventDefault();

    // Get form values
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Get feedback element
    const feedback = document.getElementById("form-feedback");

    // Check empty fields
    if (!name || !email || !subject || !message) {
        feedback.textContent = "Please fill in all fields.";
        return;
    }

    // Prepare email data
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Send email using EmailJS
    emailjs.send(
        "service_iodlwyt",
        "template_dusbjli",
        templateParams
    )

    .then(function (response) {

        feedback.textContent = "Message sent successfully!";

        // Clear form after successful sending
        contactForm.reset();

        console.log("SUCCESS!", response.status);

    })

    .catch(function (error) {

        feedback.textContent = "Failed to send message. Please try again.";

        console.error("FAILED...", error);

    });

});
