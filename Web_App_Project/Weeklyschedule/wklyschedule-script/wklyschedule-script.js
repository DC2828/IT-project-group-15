function generateTimeOptions(defaultOptionText) {
    let options = `<option value="">${defaultOptionText}</option>`;
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');
            options += `<option value="${time}">${time}</option>`;
        }
    }
    return options;
}

function addRow() {
    const schedule = document.getElementById("schedule");
    const row = schedule.insertRow(-1);

    const startTimeCell = row.insertCell(0);
    const startTimeSelect = document.createElement("select");
    startTimeSelect.innerHTML = generateTimeOptions("Start Time");
    startTimeCell.appendChild(startTimeSelect);

    const endTimeCell = row.insertCell(1);
    const endTimeSelect = document.createElement("select");
    endTimeSelect.innerHTML = generateTimeOptions("End Time");
    endTimeCell.appendChild(endTimeSelect);

    // Adding event listeners to save changes automatically
    [startTimeSelect, endTimeSelect].forEach(select => {
        select.addEventListener('change', saveSchedule);
    });

    for (let i = 2; i < 9; i++) {
        const cell = row.insertCell(i);
        const input = document.createElement("input");
        input.type = "text";
        cell.appendChild(input);
        input.addEventListener('input', saveSchedule); // Save on text change
    }

    const deleteCell = row.insertCell(9);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() { schedule.deleteRow(row.rowIndex); saveSchedule(); };
    deleteCell.appendChild(deleteBtn);
}

function saveSchedule() {
    const schedule = document.getElementById("schedule");
    const rows = [];
    for (let i = 1, row; row = schedule.rows[i]; i++) {
        const cells = row.cells;
        const startTime = cells[0].childNodes[0].value;
        const endTime = cells[1].childNodes[0].value;
        const weekData = [];
        for (let j = 2; j < cells.length - 1; j++) {
            weekData.push(cells[j].childNodes[0].value);
        }
        rows.push({startTime, endTime, weekData});
    }
    localStorage.setItem('weeklySchedule', JSON.stringify(rows));
}

function loadSchedule() {
    const schedule = document.getElementById("schedule");
    const data = localStorage.getItem('weeklySchedule');
    if (data) {
        const rows = JSON.parse(data);
        rows.forEach(row => {
            addRow();
            const lastRow = schedule.rows[schedule.rows.length - 1];
            lastRow.cells[0].childNodes[0].value = row.startTime;
            lastRow.cells[1].childNodes[0].value = row.endTime;
            row.weekData.forEach((entry, index) => {
                lastRow.cells[index + 2].childNodes[0].value = entry;
            });
        });
    }
}

window.onload = function() {
    loadSchedule();
    dateDisplay();
};