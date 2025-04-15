export function downloadMenu() {
  // URL to the menu PDF (replace with your actual PDF URL when available)
  const pdfUrl = "/menu.pdf";
  
  // Create a temporary link element
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.setAttribute("download", "taj-mahal-menu.pdf");
  link.setAttribute("target", "_blank");
  
  // Append to the document, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // If PDF doesn't exist yet, show an alert
  // This is a temporary solution until the PDF is created
  // You can remove this when you have the actual PDF
  setTimeout(() => {
    alert("Menu PDF will be downloaded in a real implementation. Currently, this is just a demo functionality.");
  }, 100);
}
