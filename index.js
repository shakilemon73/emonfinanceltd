// script.js
document.addEventListener('DOMContentLoaded', function () {
    const statusMessage = document.getElementById('status-message');
    const countdownElement = document.getElementById('countdown');
    let countdown = 30;

    // Start the countdown
    const interval = setInterval(function () {
        countdown--;
        countdownElement.textContent = `Auto-verifying in ${countdown} seconds...`;

        // When the countdown reaches 0, auto-verify
        if (countdown <= 0) {
            clearInterval(interval);
            statusMessage.textContent = 'Processing...';
            setTimeout(function () {
                statusMessage.textContent = 'Verified!';
                countdownElement.textContent = 'You have been successfully verified.';
                // Optional: Redirect after verification
                setTimeout(function () {
                    window.location.href = 'https://example.com'; // Replace with your desired URL
                }, 2000); // Redirect after 2 seconds
            }, 2000); // Simulate a 2-second processing delay
        }
    }, 1000); // Update every second
});
