/* This file contains the server-side JavaScript functions */

function doGet() {
// Serve html to browser
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Create Trips for Inbox by Gmail')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
// Include html from file
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function sendEmail(reservation) {
// Send reservation email to user's address
  var htmlBody = '<html><body><script type="application/ld+json">'+JSON.stringify(reservation)+'</script>'+
    'This message was sent by <a href="https://script.google.com/macros/s/AKfycbx7XyklxcWdxh9QJk3aS7k5LukoMoTxC3DRvJZMGq3PCnvVSluP/exec">Trip Maker</a>.</body></html>'
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Reservation at ' + reservation.reservationFor.name + ', ' + reservation.reservationFor.address.addressLocality,
    htmlBody: htmlBody,
  });
}