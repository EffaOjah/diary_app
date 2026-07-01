const API_URL = "http://localhost:3000/entries";

const form = document.getElementById("entryForm");
const entriesContainer = document.getElementById("entries");

document.addEventListener("DOMContentLoaded", loadEntries);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    form.reset();
    loadEntries();
  } catch (err) {
    console.error(err);
  }
});

async function loadEntries() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    const entries = await res.json();

    entriesContainer.innerHTML = "";

    if (!Array.isArray(entries) || entries.length === 0) {
      entriesContainer.innerHTML = "<p class='empty'>No entries yet.</p>";
      return;
    }

    entries.forEach((entry) => {
      const div = document.createElement("div");
      div.className = "entry-card";
      div.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <span class="date">${new Date(entry.created_at).toLocaleString()}</span>
      `;
      entriesContainer.appendChild(div);
    });
  } catch (err) {
    entriesContainer.innerHTML = "<p class='empty'>Could not load entries.</p>";
    console.error(err);
  }
}
