console.log("Company Website Loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("Everything is ready!");

    // Mobile flip-card controls
    const flipBoxes = document.querySelectorAll(".flip-box");

    flipBoxes.forEach((box) => {
        box.addEventListener("click", () => {

            // Do not apply this behaviour to Core Solutions
            if (box.closest("#core-solutions")) {
                return;
            }

            // Toggle this individual card
            box.classList.toggle("flipped");
        });
    });

});
