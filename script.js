let lastScanned = "";
let scannedItems = [];

function startScanner() {
  const html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 300, height: 100 },
      formatsToSupport: [ Html5QrcodeSupportedFormats.EAN_13 ]
    },
    (decodedText, decodedResult) => {
      if (decodedText !== lastScanned) {
        lastScanned = decodedText;
        const productName = "商品_" + decodedText.slice(-4);
        const item = {
          jan: decodedText,
          name: productName,
          status: "未記帳"
        };
        scannedItems.unshift(item);
        updateList();
      }
    },
    (errorMessage) => {}
  );
}

function updateList() {
  const list = document.getElementById("item-list");
  list.innerHTML = "";
  scannedItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong> (${item.jan}) - <em>${item.status}</em>
    <button onclick="goToEntry(${index})">記帳</button>
    <button onclick="removeItem(${index})">削除</button>`;
    list.appendChild(li);
  });
}

function goToEntry(index) {
  const item = scannedItems[index];
  window.location.href = "entry.html?jan=" + item.jan + "&name=" + encodeURIComponent(item.name);
}

function removeItem(index) {
  scannedItems.splice(index, 1);
  updateList();
}