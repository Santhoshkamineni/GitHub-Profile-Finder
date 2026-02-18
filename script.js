async function getProfile() {
  const username = document.getElementById('username').value.trim();
  const profile = document.getElementById('profile');
  const error = document.getElementById('error');

  if (!username) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) throw new Error('User not found');

    const data = await response.json();

    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || data.login;
    document.getElementById('bio').textContent = data.bio || 'No bio available';
    document.getElementById('repos').textContent = data.public_repos;
    document.getElementById('followers').textContent = data.followers;
    document.getElementById('following').textContent = data.following;

    profile.style.display = 'block';
    error.style.display = 'none';
  } catch (err) {
    profile.style.display = 'none';
    error.style.display = 'block';
  }
}

// Allow Enter key search
document.getElementById('username').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') getProfile();
});
