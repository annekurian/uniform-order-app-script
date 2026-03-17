function sendEmailNotification(data) {
  const { childName, childClass, items } = data;
  const uniforms = items.map(
    (item) => ` ${item.name}(${item.size}) - ${item.quantity}`,
  );
  const emailRecipient = "anne.kurian14@gmail.com"; // Replace with the recipient's email
  const emailSubject = "Uniform Order Submitted for " + childName;
  let emailBody = " Order details \n";
  emailBody += "------------------------\n";
  emailBody += "Class: " + childClass + "\n";
  emailBody += "Uniform(s): " + uniforms + "\n";
  emailBody += "Total amount: $" + items[0].total;

  // Use MailApp to send the email
  MailApp.sendEmail(emailRecipient, emailSubject, emailBody);

  return "Email sent succesfully";
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");

  const data = JSON.parse(e.postData.contents);

  const currentDate = new Date();
  const childName = data.childName;
  const childClass = data.childClass;
  const items = data.items;

  items.forEach((item, index) => {
    const lastItem = items.length - 1;
    if (index != lastItem)
      sheet.appendRow([
        currentDate,
        childName,
        childClass,
        item.name,
        item.size,
        item.quantity,
        item.price,
      ]);
    else {
      sheet.appendRow([
        currentDate,
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

  try {
    sendEmailNotification(data);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message);
  }
}
