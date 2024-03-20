(function () {
  emailjs.init({
    publicKey: "zwIZVbmX1UfqEqvTj",
  });
})();

function validateEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
delay(1000).then(() => {
  function stopUserInput() {
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("getInvite").innerText =
      "You cannot reapply for beta";
    document.getElementById("getInvite").disabled = true;
    document
      .getElementById("getInvite")
      .setAttribute(
        "class",
        "mt-[100px] m-auto bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      );
  }
  if (localStorage.getItem("invited_to_beta") === null) {
    document.getElementById("getInvite").onclick = () => {
      if (validateEmail(document.getElementById("email").value)) {
        if (document.getElementById("name").value === "") {
          alert(`That's not a valid name.`);
          return;
        }
        localStorage.setItem("invited_to_beta", "true");
        emailjs.send("service_ppptf39", "template_6uwmffp", {
          from_name: `${document.getElementById("email").value} (${
            document.getElementById("name").value
          })`,
          to_name: "CoderTJP",
        });
        stopUserInput();
        alert(
          `Email was sent! You will get a reply from CoderTJP with in the next week.`
        );
        return;
      }
      alert(`That's not a valid email address.`);
    };
  } else {
    stopUserInput();
  }
});
