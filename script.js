document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var addButton = document.getElementById("addButton");
    var closeButton = document.querySelector(".close");
    var form = document.getElementById("dataForm");
    var dataTableBody = document.querySelector("#dataTable tbody");
    var dateInput = document.getElementById("date");
    var deleteModal = document.getElementById("deleteModal");
    var deleteYesButton = document.getElementById("deleteYes");
    var deleteNoButton = document.getElementById("deleteNo");
    var selectedRow = null;

    // Load data from localStorage
    var storedData = localStorage.getItem("tableData");
    if (storedData) {
        dataTableBody.innerHTML = storedData;
    }

    addButton.onclick = function () {
        modal.style.display = "flex";
    }

    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Delete Modal Handlers
    deleteYesButton.onclick = function () {
        if (selectedRow) {
            selectedRow.remove();
            deleteModal.style.display = "none";
            selectedRow = null;
            saveDataToLocalStorage();
            updateSummary();
            sortRowsByDate();
        }
    }

    deleteNoButton.onclick = function () {
        deleteModal.style.display = "none";
    }

    // Table Row Click Handler
    dataTableBody.addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains('deleteRow')) {
            selectedRow = target.closest('tr');
            deleteModal.style.display = "block";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var date = dateInput.value;
        var entryDate = new Date(date);
        var today = new Date();

        // Check if the entered date is in the future
        if (entryDate > today) {
            alert("You cannot add entries for future dates.");
            return;
        }

        // Check if an entry already exists for the selected date
        var existingEntry = dataTableBody.querySelector("tr[data-date='" + date + "']");
        if (existingEntry) {
            alert("An entry for this date already exists.");
            return;
        }

        var routeName = document.getElementById("routeName").value;
        var totalAssigned = parseInt(document.getElementById("totalAssigned").value);
        var totalDelivered = parseInt(document.getElementById("totalDelivered").value);
        var petrol = parseInt(document.getElementById("petrol").value);
        var moneyEarned = parseInt(document.getElementById("moneyEarned").value);

        // Ensure Total Delivered is not greater than Total Assigned
        if (totalDelivered > totalAssigned) {
            alert("Total Delivered cannot be greater than Total Assigned.");
            return;
        }

        // Calculate the percentage
        var percentage = (totalDelivered / totalAssigned) * 100;

        // Calculate the money difference
        var moneyDifference = moneyEarned - petrol;

        // Create a new row for the table
        var newRow = document.createElement("tr");
        newRow.dataset.date = date; // Store the date as a data attribute
        var formattedDate = entryDate.toLocaleDateString('en-GB');
        newRow.innerHTML = "<td>" + formattedDate + "</td>" +
            "<td class='routename-class'>" + routeName + "</td>" +
            "<td>" + totalAssigned + "</td>" +
            "<td>" + totalDelivered + "</td>" +
            "<td>" + percentage.toFixed(2) + "%</td>" +
            "<td>" + petrol + "</td>" +
            "<td>" + moneyEarned + "</td>" +
            "<td>" + moneyDifference + "</td>" +
            "<td class='deleterow-btn'><button class='deleteRow'>Delete</button></td>"; // Delete button added

        // Append the new row to the table body
        dataTableBody.insertBefore(newRow, dataTableBody.firstChild);

        // Apply green background if the entry date is today

        // if (entryDate.toDateString() === today.toDateString()) {
        //     newRow.style.backgroundColor = "lightgreen";
        // }

        saveDataToLocalStorage();
        updateSummary();
        sortRowsByDate();

        // Clear the form fields
        form.reset();

        modal.style.display = "none";
    });

    // Function to save data to localStorage
    function saveDataToLocalStorage() {
        var tableData = dataTableBody.innerHTML;
        localStorage.setItem("tableData", tableData);
    }

    // Function to update the summary table
    function updateSummary() {
        var totalPetrol = 0;
        var totalMoneyEarned = 0;
        var totalMoneyDifference = 0;

        var rows = dataTableBody.querySelectorAll("tr");
        rows.forEach(function (row) {
            var petrol = parseInt(row.querySelector("td:nth-child(6)").textContent);
            var moneyEarned = parseInt(row.querySelector("td:nth-child(7)").textContent);
            var moneyDifference = parseInt(row.querySelector("td:nth-child(8)").textContent);

            totalPetrol += petrol;
            totalMoneyEarned += moneyEarned;
            totalMoneyDifference += moneyDifference;
        });

        document.getElementById("totalPetrol").textContent = totalPetrol;
        document.getElementById("totalMoneyEarned").textContent = totalMoneyEarned;
        document.getElementById("totalMoneyDifference").textContent = totalMoneyDifference;
    }

    // Function to sort rows by date
    function sortRowsByDate() {
        var rows = Array.from(dataTableBody.querySelectorAll("tr"));
        rows.sort(function (a, b) {
            var dateA = new Date(a.dataset.date);
            var dateB = new Date(b.dataset.date);
            return dateB - dateA;
        });

        rows.forEach(function (row) {
            dataTableBody.appendChild(row);
        });
    }

    // Initial update of summary
    updateSummary();
    sortRowsByDate();
});

function openNav() {
    let navBar = document.getElementById('nav-bar');
    let navBarInner = document.getElementById('nav-bar-cnt');

    navBar.style.display = 'flex';
    navBar.style.visibility = 'visible';

    navBarInner.style.transform = 'translate(0)';

}
function closeNavBody() {
    document.getElementById('nav-bar').style.visibility = 'hidden'
    document.getElementById('nav-bar-cnt').style.transform = 'translate(300px)'

    document.getElementById('weekly-transactions-body').style.visibility = 'hidden'
    document.getElementById('weekly-transactions-body').style.transform = 'translate(200%, -40%)'
}






// Function to change color scheme to white and store it in local storage
function changeWhite() {
    var root = document.documentElement;
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Update the values of CSS variables for white color scheme
    root.style.setProperty('--cplt1', '#fff');
    root.style.setProperty('--white', '#121212');
    root.style.setProperty('--blackpointfiveopacity', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--whitepointfiveopacity', 'rgba(0, 0, 0, 0.1)');

    // Update the content attribute to "red"
    metaThemeColor.setAttribute('content', '#fff');

    // Store the color scheme in local storage
    localStorage.setItem('colorScheme', 'white');
}

// Function to change color scheme to black and store it in local storage
function changeBlack() {
    var root = document.documentElement;

    var metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Update the values of CSS variables for black color scheme
    root.style.setProperty('--cplt1', '#121212');
    root.style.setProperty('--white', '#fff');
    root.style.setProperty('--blackpointfiveopacity', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--whitepointfiveopacity', 'rgba(255, 255, 255, 0.05)');


    // Update the content attribute to "red"
    metaThemeColor.setAttribute('content', '#121212');

    // Store the color scheme in local storage
    localStorage.setItem('colorScheme', 'black');
}

// Function to change color scheme to AF Blue and store it in local storage
function changeAFBlue() {
    var root = document.documentElement;
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');


    // Update the values of CSS variables for AF Blue color scheme
    root.style.setProperty('--cplt1', '#283845');
    root.style.setProperty('--white', 'white');


    // Update the content attribute to "red"
    metaThemeColor.setAttribute('content', '#283845');

    // Store the color scheme in local storage
    localStorage.setItem('colorScheme', 'afBlue');
}

// Function to apply stored color scheme
function applyStoredColorScheme() {
    var storedScheme = localStorage.getItem('colorScheme');
    if (storedScheme === 'white') {
        changeWhite();
    } else if (storedScheme === 'black') {
        changeBlack();
    } else if (storedScheme === 'afBlue') {
        changeAFBlue();
    }
}

// Apply stored color scheme when the page loads
window.onload = applyStoredColorScheme;





// Function to update the net earnings for the present day in the div
function updateTodaysNetIncome() {
    var today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    var tableBody = document.getElementById("dataTable").getElementsByTagName('tbody')[0]; // Get the tbody element
    var rows = tableBody.querySelectorAll("tr");
    var todaysNetIncome = 0;

    rows.forEach(function (row) {
        var rowDate = row.dataset.date;
        if (rowDate === today) {
            var moneyDifference = parseInt(row.querySelector("td:nth-child(8)").textContent);
            todaysNetIncome += moneyDifference;
        }
    });

    document.getElementById("todays-net-income").textContent = todaysNetIncome;
}

// Call the function to update net earnings when the page loads
document.addEventListener("DOMContentLoaded", function () {
    updateTodaysNetIncome();
});


function weeklyContainerVisibile() {
    document.getElementById('weekly-transactions-body').style.visibility = 'visible'
    document.getElementById('weekly-transactions-body').style.transform = 'translate(15%, -40%)'
}
function weeklyContainerhidden() {
    document.getElementById('weekly-transactions-body').style.visibility = 'hidden'
    document.getElementById('weekly-transactions-body').style.transform = 'translate(200%, -40%)'
}
























function displayWeeklyTransactions() {
    var dataTableBody = document.querySelector("#dataTable tbody");
    var weeklyTransactionsCnt = document.querySelector(".weekly-transactions-cnt");

    // Clear previous content
    weeklyTransactionsCnt.innerHTML = "";

    // Initialize an object to store weekly totals
    var weeklyTotals = {};

    // Iterate through the rows in the table
    var rows = dataTableBody.querySelectorAll("tr");
    rows.forEach(function (row) {
        var date = new Date(row.dataset.date);
        var weekNumber = getWeekNumber(date);

        // Initialize weekly totals if not already present
        if (!weeklyTotals[weekNumber]) {
            weeklyTotals[weekNumber] = {
                income: 0,
                petrol: 0,
                difference: 0
            };
        }

        // Update weekly totals
        var income = parseInt(row.querySelector("td:nth-child(7)").textContent);
        var petrol = parseInt(row.querySelector("td:nth-child(6)").textContent);
        var difference = parseInt(row.querySelector("td:nth-child(8)").textContent);

        weeklyTotals[weekNumber].income += income;
        weeklyTotals[weekNumber].petrol += petrol;
        weeklyTotals[weekNumber].difference += difference;
    });

    // Render weekly transactions
    for (var weekNumber in weeklyTotals) {
        if (weeklyTotals.hasOwnProperty(weekNumber)) {
            var weekData = weeklyTotals[weekNumber];
            var weekDiv = document.createElement("div");
            weekDiv.classList.add("week-summary");

            // Format the week display
            var startDate = getStartDateOfWeek(parseInt(weekNumber));
            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6); // Add 6 days to get the end date of the week

            var weekNumberSpan = document.createElement("span");
            weekNumberSpan.classList.add("week-number");
            weekNumberSpan.textContent = "Week " + weekNumber + ": ";

            var dateRangeSpan = document.createElement("span");
            dateRangeSpan.classList.add("week-duration");
            dateRangeSpan.textContent = formatDate(startDate) + " - " + formatDate(endDate);

            // Construct the HTML for the week summary with separate spans
            weekDiv.appendChild(weekNumberSpan);
            weekDiv.appendChild(dateRangeSpan);
            weekDiv.innerHTML += "<p class='total-income'>Total Income: <span class='weeks-total-income'>" + weekData.income + "</span></p>" +
                "<p class='total-petrol'>Total Petrol: <span class='weeks-total-petrol'>" + weekData.petrol + "</span></p>" +
                "<p class='net-difference'>Net Difference: <span class='weeks-total-difference'>" + weekData.difference + "</span></p>";

            // Append the week summary to the weeklyTransactionsCnt div
            weeklyTransactionsCnt.appendChild(weekDiv);
        }
    }
}

// Function to get the week number of a date
function getWeekNumber(date) {
    var dayOfWeek = date.getDay();
    var firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust for Sunday
    var januaryFirst = new Date(date.getFullYear(), 0, 1);
    var daysOffset = Math.floor((firstDayOfWeek - januaryFirst) / (24 * 60 * 60 * 1000));
    return Math.ceil((daysOffset + 1) / 7);
}

// Function to get the start date of a week based on the week number
function getStartDateOfWeek(weekNumber) {
    var januaryFirst = new Date(new Date().getFullYear(), 0, 1);
    var daysOffset = (weekNumber - 1) * 7;
    var firstDayOfWeek = new Date(januaryFirst.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    var dayOfWeek = firstDayOfWeek.getDay();
    return new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Adjust for Sunday
}

// Function to format date as "dd/mm/yyyy"
function formatDate(date) {
    return (date.getDate()).toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear();
}

// Call the function to display weekly transactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    displayWeeklyTransactions();
});











// graphs script
document.addEventListener("DOMContentLoaded", function () {
    // Extract data from the table
    var tableBody = document.querySelector("#dataTable tbody");
    var rows = tableBody.querySelectorAll("tr");
    var data = [];

    rows.forEach(function (row) {
        var date = row.querySelector("td:nth-child(1)").textContent;
        var earnings = parseInt(row.querySelector("td:nth-child(8)").textContent);
        data.push({ date: date, earnings: earnings });
    });

    // Sort data by date in ascending order
    data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    // Extract sorted dates and earnings
    var dates = data.map(function (item) {
        return item.date;
    });
    var netEarnings = data.map(function (item) {
        return item.earnings;
    });

    // Create the chart
    var ctx = document.getElementById('earningsChart').getContext('2d');
    var earningsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Net Earnings',
                data: netEarnings,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});


// function openGraphs() {
//     document.getElementById('earningsChartContainer').style.transform = 'translate(0)';
//     document.getElementById('earningsChartContainer').style.visibility = 'visible';
//     document.getElementById('earningsChartContainer').style.width = '100%';
//     document.getElementById('earningsChartContainer').style.height = '350px';
//     document.getElementById('earningsChartContainer').style.borderRadius = '5px';
//     document.getElementById('earningsChartContainer').style.fontSize = '1em';
//     document.getElementById('earningsChartContainer').style.left = '-60vw';
//     document.getElementById('earningsChartContainer').style.top = '-320px';

//     document.getElementById('nav-bar-graph-data-cnt').style.left = '0';
//     document.getElementById('nav-bar-graph-data-cnt').style.right = 'unset';
//     document.getElementById('nav-bar-graph-data-cnt').style.width = '100vw';
//     document.getElementById('nav-bar-graph-data-cnt').style.padding = '12px';
// }
// function closeGraphs() {
//     document.getElementById('earningsChartContainer').style.visibility = 'hidden';
//     document.getElementById('earningsChartContainer').style.width = '0';
//     document.getElementById('earningsChartContainer').style.height = '0';
//     document.getElementById('earningsChartContainer').style.borderRadius = '50%';
//     document.getElementById('earningsChartContainer').style.fontSize = '0';
//     document.getElementById('earningsChartContainer').style.transform = 'translate(100px,100px)';
//     document.getElementById('earningsChartContainer').style.left = '-120px';
//     document.getElementById('earningsChartContainer').style.top = '-120px';

//     document.getElementById('nav-bar-graph-data-cnt').style.left = 'unset';
//     document.getElementById('nav-bar-graph-data-cnt').style.right = '24px';
//     document.getElementById('nav-bar-graph-data-cnt').style.width = 'unset';
//     document.getElementById('nav-bar-graph-data-cnt').style.padding = 'unset';

// }

function openGraphs() {
    document.getElementById('nav-bar-graph-data-cnt').style.position = 'absolute';
    document.getElementById('nav-bar-graph-data-cnt').style.top = '0';
    document.getElementById('nav-bar-graph-data-cnt').style.left = '0';
    document.getElementById('nav-bar-graph-data-cnt').style.bottom = '0';
    document.getElementById('nav-bar-graph-data-cnt').style.right = '0';
    document.getElementById('nav-bar-graph-data-cnt').style.width = '100vw';
    document.getElementById('nav-bar-graph-data-cnt').style.height = '100vh';
    document.getElementById('nav-bar-graph-data-cnt').style.padding = '12px';
    document.getElementById('nav-bar-graph-data-cnt').style.background = 'var(--light-grad-pink-blue, radial-gradient(ellipse at 40% 0%, #bf398910 0, transparent 75%), radial-gradient(ellipse at 60% 0%, #096bde10 0, transparent 75%))';
    document.getElementById('nav-bar-graph-data-cnt').style.color = 'white';

    document.querySelector('.dwgraph-txt').style.background = 'unset';
    document.querySelector('.dwgraph-txt').style.fontSize = '1.25em';
    document.querySelector('.dwgraph-txt').style.position = 'absolute';
    document.querySelector('.dwgraph-txt').style.zIndex = '10';
    document.querySelector('.dwgraph-txt').style.margin = '4px';
    document.querySelector('.dwgraph-txt').style.left = '0';
    document.querySelector('.dwgraph-txt').style.top = '0';

    document.getElementById('earningsChartContainer').style.position = 'relative';
    document.getElementById('earningsChartContainer').style.top = '0';
    document.getElementById('earningsChartContainer').style.left = '0';
    document.getElementById('earningsChartContainer').style.width = '100%';
    document.getElementById('earningsChartContainer').style.height = '100%';
    document.getElementById('earningsChartContainer').style.visibility = 'visible';
    document.getElementById('earningsChartContainer').style.transform = 'translate(0,0)';
    document.getElementById('earningsChartContainer').style.fontSize = '1em';
    document.getElementById('earningsChartContainer').style.background = 'unset';


}
function closeGraphs() {
    document.getElementById('nav-bar-graph-data-cnt').style.position = 'fixed';
    document.getElementById('nav-bar-graph-data-cnt').style.top = 'unset';
    document.getElementById('nav-bar-graph-data-cnt').style.left = 'unset';
    document.getElementById('nav-bar-graph-data-cnt').style.bottom = '24px';
    document.getElementById('nav-bar-graph-data-cnt').style.right = '24px';
    document.getElementById('nav-bar-graph-data-cnt').style.width = 'auto';
    document.getElementById('nav-bar-graph-data-cnt').style.height = 'auto';
    document.getElementById('nav-bar-graph-data-cnt').style.padding = '0';
    document.getElementById('nav-bar-graph-data-cnt').style.transform = 'translate(0,0)';
    document.getElementById('nav-bar-graph-data-cnt').style.background = '';
    document.getElementById('nav-bar-graph-data-cnt').style.color = '';

    document.querySelector('.dwgraph-txt').style.background = '';
    document.querySelector('.dwgraph-txt').style.fontSize = '1em';
    document.querySelector('.dwgraph-txt').style.position = 'unset';
    document.querySelector('.dwgraph-txt').style.zIndex = '10';
    document.querySelector('.dwgraph-txt').style.margin = '12px 0';
    document.querySelector('.dwgraph-txt').style.left = '0';
    document.querySelector('.dwgraph-txt').style.top = '0';

    document.getElementById('earningsChartContainer').style.position = 'relative';
    document.getElementById('earningsChartContainer').style.top = '0';
    document.getElementById('earningsChartContainer').style.left = '0';
    document.getElementById('earningsChartContainer').style.width = '0';
    document.getElementById('earningsChartContainer').style.height = '0';
    document.getElementById('earningsChartContainer').style.visibility = 'hidden';
    document.getElementById('earningsChartContainer').style.transform = 'translate(0,0)';
    document.getElementById('earningsChartContainer').style.fontSize = '0';

}




// function playAudio() {
//     var audio = document.getElementById('myAudio');
//     var button = document.getElementById('toggle-sound-btn');

//     if (audio.paused) {
//         audio.play();
//         button.textContent = 'Pause Sound';
//     } else {
//         audio.pause();
//         button.textContent = 'Play Sound';
//     }
// }

function updateTime() {
    var audio = document.getElementById('myAudio');
    var timeDisplay = document.getElementById('audio-time');
    var currentTime = audio.currentTime;
    var minutes = Math.floor(currentTime / 60);
    var seconds = Math.floor(currentTime % 60);
    var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    timeDisplay.textContent = formattedTime;
}

function openContactForm() {
    var getInTouchCnt = document.getElementById('getintouch-cnt');

    getInTouchCnt.style.visibility = 'visible';
    getInTouchCnt.style.height = '380px';
    getInTouchCnt.style.width = '280px';
    getInTouchCnt.style.maxWidth = '80%';
    getInTouchCnt.style.transform = 'translate(0,0) ';
    getInTouchCnt.style.borderRadius = '12px';
    getInTouchCnt.style.fontSize = '';


}

function closeContactForm() {
    var getInTouchCnt = document.getElementById('getintouch-cnt');

    getInTouchCnt.style.visibility = 'hidden';
    getInTouchCnt.style.height = '0';
    getInTouchCnt.style.width = '280px';
    getInTouchCnt.style.fontSize = '0';

    getInTouchCnt.style.maxWidth = '80%';
    getInTouchCnt.style.transform = 'translate(0,400px) ';
    // getInTouchCnt.style.borderRadius = '50%';
}

















const svgElement = document.getElementById('nameandbiochanger-id');
const modalDiv = document.getElementById('name-occ-input-modals-cnt');

svgElement.addEventListener('click', function () {
    modalDiv.style.display = 'flex';
});

function closeNameBioModal() {
    document.getElementById('name-occ-input-modals-cnt').style.display = 'none'
}




const userNameInput = document.getElementById('userNameInput');
const userOccupationInput = document.getElementById('userOccupationInput');
const userNameTitle = document.getElementById('UserName-Title-Id');
const userOccupationTitle = document.getElementById('abtme-occ-title');

// Load values from localStorage if available, or use existing random text
userNameInput.value = localStorage.getItem('userName') || userNameTitle.textContent;
userOccupationInput.value = localStorage.getItem('userOccupation') || userOccupationTitle.textContent;
userNameTitle.textContent = userNameInput.value;
userOccupationTitle.textContent = userOccupationInput.value;

// Update titles, store values, and limit input length on input change
userNameInput.addEventListener('input', function () {
    let value = userNameInput.value.slice(0, 16); // Trim input to 16 characters
    userNameTitle.textContent = value;
    localStorage.setItem('userName', value);
});

userOccupationInput.addEventListener('input', function () {
    let value = userOccupationInput.value.slice(0, 32); // Trim input to 16 characters
    userOccupationTitle.textContent = value;
    localStorage.setItem('userOccupation', value);

});















document.addEventListener('DOMContentLoaded', function () {
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    const uploadPdfButton = document.getElementById('uploadPdfButton');

    // Generate PDF
    downloadPdfButton.addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("YourData", 20, 10);

        // Use autoTable plugin to convert HTML table to PDF
        doc.autoTable({ html: '#dataTable' });

        doc.save('YourData.pdf');
    });
});





























