async function exportToPDF() {
    if (currentTreeID === null) {
        Swal.fire("No tree selected");
        return;
    }

        const {jsPDF} = window.jspdf;
        const element = document.getElementById('cardContainer'); // Nur das Koordinatensystem

        // 1. Screenshot vom Div erstellen
        const canvas = await html2canvas(element, {
            scale: 2, // Höhere Qualität
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');

        // 2. PDF erstellen (A4 Querformat)
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("mein-stammbaum.pdf");

}