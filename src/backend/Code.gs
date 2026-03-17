function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");

  const data = JSON.parse(e.postData.contents);

  const childName = data.childName;
  const childClass = data.childClass;
  const items = data.items;

  items.forEach((item, index) => {
    const lastItem = items.length - 1;
    if (index != lastItem)
      sheet.appendRow([
        new Date(),
        childName,
        childClass,
        item.name,
        item.size,
        item.quantity,
        item.price,
      ]);
    else {
      console.log("updating total");
      sheet.appendRow([
        new Date(),
        childName,
        childClass,
        item.name,
        item.size,
        item.quantity,
        item.price,
        item.total,
      ]);
    }
  });

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
