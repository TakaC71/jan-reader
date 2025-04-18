function getList() {
  return JSON.parse(localStorage.getItem("jan-list") || "[]");
}
function saveList(data) {
  localStorage.setItem("jan-list", JSON.stringify(data));
}
function addProduct(jan) {
  const list = getList();
  if (!list.includes(jan)) {
    list.unshift(jan);
    saveList(list);
  }
}
function renderList() {
  const list = getList();
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";
  list.forEach((jan, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${jan}</span>
      <button onclick="goToEntry('${jan}')">記帳</button>
      <button onclick="deleteItem(${i})">削除</button>`;
    container.appendChild(div);
  });
}
function deleteItem(index) {
  const list = getList();
  list.splice(index, 1);
  saveList(list);
  renderList();
}
function clearRecorded() {
  const list = getList().filter(x => !x.includes("記帳済"));
  saveList(list);
  renderList();
}
function goToEntry(jan) {
  window.location.href = "entry.html?jan=" + jan;
}
function onScanSuccess(decodedText) {
  if (!decodedText.match(/^\d{8,13}$/)) return;
  document.getElementById("overlay").innerText = decodedText;
  addProduct(decodedText);
}
if (window.Html5QrcodeScanner) {
  new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }).render(onScanSuccess);
}
window.onload = renderList;