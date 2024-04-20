const modalDiv = document.getElementById("modal-root");

if (modalDiv && modalDiv.children.length > 0) {
  document.body.style.overflow = "hidden";
} else {
  document.body.style.overflow = "auto";
}
