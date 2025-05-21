export class JournalApi {
  fetchJournal = async function (url, key) {
    const journalUrl = url + "/journal";
    const headers = new Headers();
    headers.append("X-API-Key", key);
    const result = await fetch(journalUrl, {
      method: "GET",
      headers: headers,
    });

    return result;
  };

  sendMessage = function (url, key, msg) {
    const journalUrl = url + "/journal";
    const appendUrl = journalUrl + "/append";

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        console.log(request.status + ": " + request.statusText);
      }
    };
    request.open("POST", appendUrl, false);
    request.setRequestHeader("X-API-Key", key);
    request.setRequestHeader("Content-Type", "application/json");

    var body = JSON.stringify([msg]);

    request.send(body);
  };

  resetJournal = async function (url, key) {
    const journalUrl = url + "/journal";
    const headers = new Headers();
    headers.append("X-API-Key", key);
    const result = await fetch(journalUrl, {
      method: "DELETE",
      headers: headers,
    });

    return result;
  };
}
