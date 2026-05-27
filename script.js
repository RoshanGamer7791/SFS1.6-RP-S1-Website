const BULLETIN_URL =
  "https://raw.githubusercontent.com/ssdcatlabs/SFS1.6RoleplayManagerConfigs/main/board.json";

async function loadAnnouncements() {
  try {
    const res = await fetch(BULLETIN_URL);
    if (!res.ok) throw new Error("Failed to fetch bulletin board");

    const data = await res.json();
    const container = document.getElementById("announcements");
    container.innerHTML = "";

    for (const title in data) {
      const announcement = data[title];

      const card = document.createElement("div");
      card.className = `card ${announcement.status.toLowerCase()}`;

      const heading = document.createElement("div");
      heading.className = "card-title";
      heading.textContent = title;

      const text = document.createElement("p");
      text.textContent = announcement.text;

      card.appendChild(heading);
      card.appendChild(text);
      container.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    document.getElementById("announcements").textContent =
      "Failed to load announcements.";
  }
}

loadAnnouncements();

const LAUNCH_RECORDS_URL =
  "https://raw.githubusercontent.com/RoshanGamer7791/SFS1.6RoleplayConfigs/main/LaunchRecords.json";

async function loadLaunchRecords() {
  try {
    const res = await fetch(LAUNCH_RECORDS_URL);
    if (!res.ok) throw new Error("Failed to fetch launch records");

    const data = await res.json();
    const records = data.Launch_Records;

    const container = document.getElementById("launch-records");
    container.innerHTML = "";

    records.forEach((r, index) => {
      const p = document.createElement("p");

      const launchNumber = index + 1;
      const year = Math.floor(index / 6) + 1;

      const isFirst =
        r.event.toLowerCase().includes("first") &&
        !r.event.toLowerCase().includes("for ");

      if (isFirst) p.classList.add("firstrecord");

      p.textContent =
        `Launch #${launchNumber} | ` +
        `${r.event} | ` +
        `${r.who} | ` +
        `Year ${2000+year}`;

      container.appendChild(p);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("launch-records").textContent =
      "Failed to load launch records.";
  }
}

loadLaunchRecords();
const RELATIONS_URL =
  "https://raw.githubusercontent.com/RoshanGamer7791/SFS1.6RoleplayConfigs/main/Relations.json";

async function loadRelations() {
  const res = await fetch(RELATIONS_URL);
  const text = await res.text();

  if (!text.trim().startsWith("{")) {
    console.error("Relations JSON invalid:", text.slice(0, 200));
    throw new Error("Relations response is not JSON");
  }

  const data = JSON.parse(text);
  const relations = data.Relations;

  const container = document.getElementById("relations");
  container.innerHTML = "";

  for (const rel of relations) {
    const h3 = document.createElement("h3");
    h3.textContent = rel.name;

    const p = document.createElement("p");
    p.textContent = rel.what;

    const membersLabel = document.createElement("small");
    membersLabel.textContent = "Members:";

    container.appendChild(h3);
    container.appendChild(p);
    container.appendChild(membersLabel);
    container.appendChild(document.createElement("br"));

    const members = rel.who.split(",").map(m => m.trim());

    for (const m of members) {
      const sm = document.createElement("small");
      sm.textContent = m;
      container.appendChild(sm);
      container.appendChild(document.createElement("br"));
    }
  }
}

loadRelations().catch(err => {
  document.getElementById("relations").textContent =
    "Failed to load relations.";
  console.error(err);
});

const AGENCIES_URL =
  "https://raw.githubusercontent.com/RoshanGamer7791/SFS1.6RoleplayConfigs/main/SpaceAgencyConfigs.json";

async function loadAgencies() {
  const res = await fetch(AGENCIES_URL);
  const text = await res.text();

  if (!text.trim().startsWith("{")) throw new Error("Invalid agency JSON");

  const data = JSON.parse(text);
  const agencies = data.Space_Agencies;

  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  for (const a of agencies) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = a.name;

    const tdOwner = document.createElement("td");
    tdOwner.textContent = a.owner;

    const tdType = document.createElement("td");
    tdType.textContent = a.type;

    const tdPrestige = document.createElement("td");
    tdPrestige.textContent = a.prestige;
    if (Number(a.prestige) >= 13) tdPrestige.classList.add("firstrecord");

    const tdStatus = document.createElement("td");
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = a.status;
    tdStatus.appendChild(tag);

    tr.appendChild(tdName);
    tr.appendChild(tdOwner);
    tr.appendChild(tdType);
    tr.appendChild(tdPrestige);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  }

  const comms = document.getElementById("comms");
  comms.innerHTML = "";

  for (const a of agencies) {
    const p = document.createElement("p");
    p.textContent = `${a.owner}: ${a.comms}`;
    comms.appendChild(p);
  }
}

loadAgencies().catch(console.error);