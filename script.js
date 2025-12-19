
let rooms = [
    { id: 101, type: 'Single Room', status: 'Available' },
    { id: 102, type: 'Double Room', status: 'Available' },
    { id: 103, type: 'Executive Suite', status: 'Not Available' }
];


function showPage(pageId) {
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
   
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.classList.add('active');
    }

    
    if(pageId === 'admin') {
        updateAdminTable();
    }
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function handleReserve() {
    const name = document.getElementById('userName').value;
    const room = document.getElementById('roomType').value;
    const msgDiv = document.getElementById('reserveMsg');
    
    msgDiv.style.display = "block";

    if (name.trim() === "") {
        msgDiv.className = "alert alert-danger shadow-sm mt-4";
        msgDiv.innerText = "⚠️ Error: Please enter your name to complete the reservation.";
    } else {
        const resId = Math.floor(1000 + Math.random() * 9000);
        msgDiv.className = "alert alert-success shadow-sm mt-4";
        msgDiv.innerHTML = `<strong>Success!</strong> Room ${room} is reserved for <b>${name}</b>.<br>Your Reservation ID: <span class="badge bg-dark">${resId}</span>`;
        document.getElementById('userName').value = ""; 
    }
}


function handleCancel() {
    const cancelID = document.getElementById('cancelID').value;
    const msgDiv = document.getElementById('cancelMsg');
    
    msgDiv.style.display = "block";

    if (cancelID.trim() === "") {
        msgDiv.className = "alert alert-warning shadow-sm mt-4";
        msgDiv.innerText = "⚠️ Please enter a Reservation ID to search.";
    } else {
        msgDiv.className = "alert alert-info shadow-sm mt-4";
        msgDiv.innerText = `Request Processed: Reservation #${cancelID} has been cancelled successfully.`;
        document.getElementById('cancelID').value = "";
    }
}


function updateAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML = '';

    rooms.forEach((room, index) => {
        const badgeColor = room.status === 'Available' ? 'bg-success' : 'bg-danger';
        
        const row = `
            <tr>
                <td class="fw-bold">#${room.id}</td>
                <td>${room.type}</td>
                <td><span class="badge ${badgeColor}">${room.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="toggleRoomStatus(${index})">
                        Switch Status
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function toggleRoomStatus(index) {
    rooms[index].status = (rooms[index].status === 'Available') ? 'Not Available' : 'Available';
    updateAdminTable();
}


function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (email && pass) {
        alert("Login successful! Welcome to HotelSys.");
        showPage('home');
    } else {
        alert("Please enter valid credentials.");
    }
}

function handleSignUp() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    
    if (name && email) {
        alert(`Thank you ${name}! Account created. Please login now.`);
        showPage('login');
    } else {
        alert("Please fill in all details.");
    }
}