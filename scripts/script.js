document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Function to read the TSV file and generate floating cards
    function createFloatingCardsFromTSV(tsvData) {
        const rows = tsvData.split("\n");

        rows.forEach((row, index) => {
            const columns = row.split("\t"); // Assuming tab-separated values

            // Skip headers
            if (index === 0) {
                return;
            }

            // Skip empty rows
            if (columns.length === 1 && columns[0] === "") {
                return;
            }

            // skip entries with 0 stock
            if (columns[3] === 0) {
                return;
            }

            let type_color;
            if (columns[5] === "Beer") {
                type_color = "#ffa600";
            }

            else if (columns[5] === "AF Beer") {
                type_color = "#bc5090";
            }

            else if (columns[5] === "Cider") {
                type_color = "#ff6361";
            }

            else {
                type_color = "#58508d";
            }
            
            const card = document.createElement("div");
            card.className = "floating-card";
            card.innerHTML = `
                <h3><b>${columns[4]}</b></h3>
                <div class="card-img-container">
                    <img src="figures/logo.png" alt="item-image">
                    <div class="top-left">${columns[3]} x</div>
                    <div class="top-right" style="color:${type_color}; background:${type_color}>${columns[3]} x</div>
                </div>
                <b>Quantity:</b> ${columns[3]} <br>
                <b>Type:</b> ${columns[5]} <br>
                <b>Description:</b> ${columns[2]} <br>
                <b>ID:</b> ${columns[1]} <br>
                
            `;

            cardContainer.appendChild(card);
        });
    }

    // Function to fetch the TSV file and call createFloatingCardsFromTSV
    function fetchTSVAndCreateCards() {
        fetch("data/inventory.tsv") // Replace with the path to your TSV file
            .then((response) => response.text())
            .then((data) => createFloatingCardsFromTSV(data))
            .catch((error) => console.error("Error fetching TSV data:", error));
    }

    fetchTSVAndCreateCards();
});
