function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "732309076710-sus2jtfpi9pljm3antvr1gf85ifrlj6l.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
        document.getElementById("googleLogin"), {   
            theme: "outline", 
            size: "large"
        }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}