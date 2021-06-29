(async () => {
  const bent = require('bent');
  const fs = require('fs');
  const { USERNAME, PASSWORD } = process.env;

  const bent_string = bent('string', 'POST', 200, 301, 302);

  const tickets = fs.readFileSync('tickets.txt', 'utf8').split(",").map(x => parseInt(x, 10));
  const req = fs.readFileSync('req.xml', 'utf8');

  for (let i = 0; i < tickets.length; ++i) {
    const ticket = tickets[i];

    try {
      const auth_req = req.replace('{{TICKET_ID}}', ticket + "").replace('{{USERNAME}}', USERNAME).replace('{{PASSWORD}}', PASSWORD);
      await bent_string('https://itsm-fp.northwestern.edu/MRcgi/MRWebServices.pl', auth_req);
      console.log(`Updated ${ticket} (${i + 1}/${tickets.length})`);
    } catch (e) {
      console.error(`Failed to update ${ticket}: ${e.message}`);
    }
  }
})()
