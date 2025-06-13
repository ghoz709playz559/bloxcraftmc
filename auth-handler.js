// Initialize Firebase Auth and Database
const auth = firebase.auth();
const db = firebase.database();

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const msg = document.getElementById('registerMsg');

  msg.textContent = "";

  if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match!";
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    // Save additional info in Realtime Database
    await db.ref("users/" + userId).set({
      username: username,
      email: email,
      joined: new Date().toISOString()
    });

    msg.textContent = "Registration successful!";
    msg.classList.replace("text-red-600", "text-green-600");
  } catch (error) {
    msg.textContent = error.message;
  }
});
