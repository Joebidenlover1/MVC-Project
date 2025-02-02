async function loadResults() {
    const response = await fetch('get_results.php');
    const results = await response.json();

    for (const [sectionId, counts] of Object.entries(results)) {
        document.getElementById(`countA-${sectionId}`).textContent = counts.A;
        document.getElementById(`countB-${sectionId}`).textContent = counts.B;
    }
}

window.onload = loadResults;